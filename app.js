const { res } = require('express')
const express = require('express')

const PORT = 4000

// Importing all the pokemon for our data file
const allPokemon = require('./data')
const app = express()

app.use(express.json())

// -- Define your route listeners here! --

app.get('/pokemon', (req, res) => {
  console.log('A rota /pokemon foi chamada')

  return res.send(allPokemon)
})

app.get('/pokemon/search', (req, res) => {
  const queryParams = req.query
  console.log(queryParams)

  for (let key in queryParams) {
    const foundPokemon = allPokemon.find((pokemonElement) => {
      return pokemonElement[key]
        .toLowerCase()
        .includes(queryParams[key].toLowerCase())
    })

    if (foundPokemon) {
      return res.json(foundPokemon)
    } else {
      return res.json({ msg: 'Pokemon not found!' })
    }
  }

  res.json(queryParams)
})

app.get('/pokemon/:id', (req, res) => {
  const id = req.params.id

  const foundPokemon = allPokemon.find((pokemonElement) => {
    return pokemonElement.id === Number(id)
  })

  return res.json(foundPokemon)
})

//CRUD
app.post('/pokemon', (req, res) => {
  const formData = req.body

  const newPokemon = {
    id: formData.id,
    name: formData.name,
    types: formData.types[('', '')],
    height: formData.height,
    weight: formData.weight,
    sprite: formData.sprite,
  }

  allPokemon.push(newPokemon)

  return res.json(newPokemon)
})

app.put('/pokemon/:id', (req, res) => {
  const formData = req.body

  const id = req.params.id

  const foundPokemon = allPokemon.find((pokemonElement) => {
    return pokemonElement.id === Number(id)
  })
  const index = allPokemon.indexOf(foundPokemon)

  allPokemon[index] = { ...foundPokemon, ...formData }
  return res.json(allPokemon[index])
})

app.delete('/pokemon/:id', (req, res) => {
  const index = allPokemon.findIndex((pokemonElement) => {
    return pokemonElement.id === req.params.id
  })

  if (index > 0) {
    allPokemon.splice(index, 1)
    return res.json({ msg: 'Pokemon deleted successfully' })
  } else {
    return res.json({ msg: 'Pokemon not found.' })
  }
})

app.listen(PORT, () => {
  console.log(`Server up and running at port ${PORT}`)
})
