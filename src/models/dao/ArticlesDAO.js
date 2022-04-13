class ArticlesDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, pkm_name, pkm_level, type_1, type_2 FROM pokemon')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, pkm_name, pkm_level, type_1, type_2 FROM pokemon WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (pokemon) {
    const response = await this.db.query('INSERT INTO pokemon (pkm_name, pkm_level, type_1, type_2) VALUES (?, ?, ?, ?)', [pokemon.pkm_name, pokemon.pkm_level, pokemon.type_1, pokemon.type_2])
    const result = response[0]
    return result.insertId
  }

  async update (pokemon) {
    const response = await this.db.query('UPDATE pokemon SET pkm_name = ?, pkm_level = ?, type_1 = ?, type_2 = ? WHERE id = ?', [pokemon.pkm_name, pokemon.pkm_level, pokemon.type_1, pokemon.type_2])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM pokemon WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = ArticlesDAO
