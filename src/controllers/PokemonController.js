const PokemonDAO = require('../models/dao/PokemonDAO')

class PokemonController {
  constructor (db) {
    this.pokemonDao = new PokemonDAO(db)
    this.renderHomeWithPokemon = this.renderHomeWithPokemon.bind(this)
    this.renderSinglePokemon = this.renderSinglePokemon.bind(this)
    this.renderPokemonCreationForm = this.renderPokemonCreationForm.bind(this)
    this.renderPokemonUpdateForm = this.renderPokemonUpdateForm.bind(this)
    this.insertAndRenderPokemon = this.insertAndRenderPokemon.bind(this)
    this.updateAndRenderPokemon = this.updateAndRenderPokemon.bind(this)
    this.deletePokemonAndRenderResponse = this.deletePokemonAndRenderResponse.bind(this)
  }

  async renderHomeWithPokemon (req, res) {
    const pokemon = await this.pokemonDao.getAll()
    res.render('home', {
      pokemon
    })
  }

  async renderSinglePokemon (req, res) {
    const id = req.params.id

    try {
      const pokemon = await this.pokemonDao.getById(id)

      if (!pokemon) {
        res.status(404).render('404') //
        return
      }

      res.render('pokemon', {
        id,
        pkmn_name: pokemon.pkm_name,
        pkmn_level: pokemon.pkm_level,
        pkmn_type1: pokemon.type_1,
        pkmn_type2: pokemon.type_2
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500') //
    }
  }

  renderPokemonCreationForm (req, res) {
    res.render('pokemon-edited') //
  }

  async renderPokemonUpdateForm (req, res) {
    const id = req.params.id

    try {
      const pokemon = await this.pokemonDao.getById(id)

      if (!pokemon) {
        res.status(404).render('404')
        return
      }

      res.render('pokemon-edited', {
        id,
        pkmn_name: pokemon.pkm_name,
        pkmn_level: pokemon.pkm_level,
        pkmn_type1: pokemon.type_1,
        pkmn_type2: pokemon.type_2
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderPokemon (req, res) {
    const pkmnName = req.body.pkm_name
    const pkmLevel = req.body.pkm_level
    const type1 = req.body.type_1
    const type2 = req.body.type_2

    const pokemon = { pkmnName, pkmLevel, type1, type2 }

    try {
      const id = await this.pokemonDao.create(pokemon)

      res.redirect(`/pokemon/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderPokemon (req, res) {
    const id = req.params.id
    const pkmnName = req.body.pkm_name
    const pkmLevel = req.body.pkm_level
    const type1 = req.body.type_1
    const type2 = req.body.type_2

    try {
      const pokemon = { id, pkmnName, pkmLevel, type1, type2 }

      await this.pokemonDao.update(pokemon)

      res.redirect(`/pokemon/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deletePokemonAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const pokemon = await this.pokemonDao.getById(id)

      if (!pokemon) {
        res.status(404).render('404')
        return
      }

      await this.pokemonDao.delete(id)

      res.render('pokemon-deleted', {
        id,
        name: pokemon.pkm_name,
        level: pokemon.pkm_level,
        type1: pokemon.type_1,
        type2: pokemon.type_2
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = PokemonController
