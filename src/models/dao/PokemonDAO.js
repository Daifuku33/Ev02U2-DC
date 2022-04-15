class PokemonDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, name, level, type1, type2 FROM pokemon')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, name, level, type1, type2 FROM pokemon WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  // siempre camelcase
  async create (pokemon) {
    const response = await this.db.query('INSERT INTO pokemon (name, level, type1, type2) VALUES (?, ?, ?, ?)', [pokemon.name, pokemon.level, pokemon.type1, pokemon.type2])
    const result = response[0]
    return result.insertId
  }

  async update (pokemon) {
    const response = await this.db.query('UPDATE pokemon SET name = ?, level = ?, type1 = ?, type2 = ? WHERE id = ?', [pokemon.name, pokemon.level, pokemon.type1, pokemon.type2, pokemon.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM pokemon WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = PokemonDAO
