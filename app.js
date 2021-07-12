const { response } = require('express')
const express = require('express')

const PORT = 4000

// Importing all the pokemon for our data file
const allPokemon = require('./data')
const app = express()

app.use(express.json())

// -- Define your route listeners here! --

app.get('/pokemon', (request, response) => {
  console.log('A rota /pokemon foi chamada')

  return response.send(allPokemon)
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

  const foundPokemon = allPokemon.find((pokemon) => {
    return pokemon.id === Number(id)
  })

  return response.json(foundPokemon)
})

app.post("/pokemon", (req, res) => {

    const formData = req.body;

    const newContact = {
        id: formData.id,
        name: formData.name,
        types: formData.types["", ""],
        height: formData.height,
        weight: formData.weight,
        sprite: formData.sprite
      };


app.put("/pokemon/:id", (req, res) => {
        const formData = req.body;

        const id = req.params.id;

        const foundContact = allPokemon.find((contactElement) => {
          return contactElement.id === Number(id);
        });
        const index = allPokemon.indexOf(foundContact);

        allPokemon[index] = { ...foundContact, ...formData };

app.delete("/pokemon/:id", (req, res) => {
            const index = allPokemon.findIndex((contactElement) => {
              return contactElement.id === req.params.id;
            });

            if (index > 0) {
                allPokemon.splice(index, 1);
                return res.json({ msg: "Pokemon deleted successfully" });
              } else {
                return res.json({ msg: "Pokemon not found." });
              }
            });

app.listen(PORT, () => {
  console.log(`Server up and running at port ${PORT}`)
});
