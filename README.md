![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Pokemon JSON API

## Introduction

In this lab, we're gonna build an API that returns JSON information about Pokemon! All the information is already available in the `data.js` file. Your task is to make this information available in a JSON API using the Express skills that we learned in class.

You should use `express` to create your app, build the routing logic with the built-in app routing methods, and serve JSON content for every request.

## Requirements

- Fork this repo
- Clone this repo

## Submission

- Upon completion, run the following commands:

  ```bash
  git add .
  git commit -m "Solved Lab"
  git push origin master
  ```

- Create Pull Request so your TAs can check up your work.

## Instructions

**Your API should have (at least) 3 endpoints (routes):**

1. A `GET /pokemon` route, that serves an array of objects containing data about all the Pokemons
2. An `GET /pokemon/:id` route, that serves an object of a specific Pokemon (search in the array using the provided `id`)
3. A `GET /search` route, where the user can search Pokemons by name or type (when searching by type, should return all the pokemon found with that type)

**BONUS**

4. A `POST /pokemon` route, that inserts the new Pokemon into the existing list of all Pokemons (don't worry about persisting the data to the disk, we're gonan learn that later)
5. A `PUT /pokemon/:id` route, that updates an existing Pokemon with the provided data
6. A `DELETE /pokemon/:id` route, that deletes an existing Pokemon and returns a success message

> Hint: Don't forget that to be able to receive data from the client, you have to tell Express to accept JSON request bodies :)

You should go through the following steps:

1. Run `npm install` to install the Express package.
2. Build your Express app in `app.js`. The basics are already provided for you, you just have to build your endpoints.
3. Run `npm start` to start you server in watch mode.

Happy coding! 💙
