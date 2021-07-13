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

app.get('/search', (req, res) => {
  //RESOLUCAO LAB
  // Caso a url seja `?name=jigglypuff` o objeto `query` será o seguinte:
  // {
  //   name: "jigglypuff";
  // }

  // Fazemos um loop pra iterar sobre cada propriedade (chave) do objeto query
  for (let key in req.query) {
    // nesse caso, key = 'name'
    const filteredPokemon = allPokemon.filter((currentPokemon) => {
      // Pesquisando por tipos
      if (key === 'types') {
        return currentPokemon.types.includes(req.query.types)
      }

      // Pesquisando por nome
      return currentPokemon.name
        .toLowerCase()
        .includes(req.query.name.toLowerCase())
    })

    if (filteredPokemon.length) {
      return res.json(filteredPokemon)
    }

    return res.json({ msg: 'No Pokemon matches this search.' })
  }
})

//RESPOSTA SOMENTE RETORNA NOMES ABAIXO
//   const queryParams = req.query
//   console.log(queryParams)

//   for (let key in queryParams) {
//     const foundPokemon = allPokemon.find((pokemonElement) => {
//       return pokemonElement[key]
//         .toLowerCase()
//         .includes(queryParams[key].toLowerCase())
//     })

//     if (foundPokemon) {
//       return res.json(foundPokemon)
//     } else {
//       return res.json({ msg: 'Pokemon not found!' })
//     }
//   }

//   res.json(queryParams)
// })
// 2. An GET /pokemon/:id route, that serves an object of a specific Pokemon (search in the array using the provided id)
app.get('/pokemon/:id', (req, res) => {
  const id = req.params.id

  const foundPokemon = allPokemon.find((pokemonElement) => {
    return pokemonElement.id === Number(id)
  })
  // if (foundPokemon) { ---->PARA INCLUIR MSG DE NAO ENCONTRADO
  return res.json(foundPokemon) // ---->SO RETORNA O QUE ACHAR
  // }   PARA INCLUIR MSG DE NAO ENCONTRADO

  // return res.json({ msg: "Pokemon not found." }); ---->PARA INCLUIR MSG DE NAO ENCONTRADO
})
// 4. A POST /pokemon route, that inserts the new Pokemon into the existing list of all Pokemons (don't worry about persisting the data to the disk, we're gonan learn that later)
//CRUD
app.post('/pokemon', (req, res) => {
  const formData = req.body

  // Pegando o último id da lista de todos os Pokemons
  const lastId = allPokemon[allPokemon.length - 1].id

  // O novo Pokemon vai continuar a sequencia de ids
  const newPokemon = { ...formData, id: lastId + 1 }

  allPokemon.push(newPokemon)

  return res.json(newPokemon)
})

//   const newPokemon = {
//     id: formData.id,
//     name: formData.name,
//     types: formData.types[('', '')],
//     height: formData.height,
//     weight: formData.weight,
//     sprite: formData.sprite,
//   }

//   allPokemon.push(newPokemon)

//   return res.json(newPokemon)
// })

app.put('/pokemon/:id', (req, res) => {
  const formData = req.body

  const id = req.params.id

  const foundPokemon = allPokemon.find((pokemonElement) => {
    return pokemonElement.id === Number(id)
  })
  if (foundPokemon) {
    // Atualiza o elemento da array com os dados do corpo (body) da requisição
    const index = allPokemon.findIndex((currentPokemon) => {
      return currentPokemon.id === Number(id)
    })

    if (index > -1) {
      allPokemon[index] = { ...foundPokemon, ...formData }

      return res.json(allPokemon[index])
    } else {
      return res.json({ msg: 'Pokemon not found.' })
    }
  }

  return res.json({ msg: 'Pokemon not found.' })
})

// const index = allPokemon.indexOf(foundPokemon)

// allPokemon[index] = { ...foundPokemon, ...formData }
// return res.json(allPokemon[index])

app.delete('/pokemon/:id', (req, res) => {
  const id = req.params.id

  const index = allPokemon.findIndex((currentPokemon) => {
    return currentPokemon.id === Number(id)
  })

  if (index > -1) {
    allPokemon.splice(index, 1)
    return res.json({ msg: 'Pokemon successfully removed.' })
  }

  return res.json({ msg: 'Pokemon not found.' })
})

//   const index = allPokemon.findIndex((pokemonElement) => {
//     return pokemonElement.id === req.params.id
//   })

//   if (index > 0) {
//     allPokemon.splice(index, 1)
//     return res.json({ msg: 'Pokemon deleted successfully' })
//   } else {
//     return res.json({ msg: 'Pokemon not found.' })
//   }
// })

app.listen(PORT, () => {
  console.log(`Server up and running at port ${PORT}`)
})
