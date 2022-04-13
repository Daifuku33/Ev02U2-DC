const express = require('express')
const PokemonController = require('./controllers/PokemonController')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database Client
const sqlClient = new SqlClient()

// Controllers
const pageController = new PageController()
const pokemonController = new PokemonController(sqlClient)

// Routes
router.get('/', pokemonController.renderHomeWithPokemon)
router.get('/about', pageController.renderAbout)

router.get('/pokemon/add', pokemonController.renderPokemonCreationForm)
router.post('/pokemon/add', pokemonController.insertAndRenderPokemon)

router.get('/pokemon/:id', pokemonController.renderSinglePokemon)

router.get('/pokemon/:id/update', pokemonController.renderPokemonUpdateForm)
router.post('/pokemon/:id/update', pokemonController.updateAndRenderPokemon)

router.post('/pokemon/:id/delete', pokemonController.deletePokemonAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router
