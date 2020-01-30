const knex = require('knex')
const { Model, knexSnakeCaseMappers } = require('objection')

const knexfile = require('../database/knexfile')


// Note: overwrite connection for runtime (rather than migrate time)
knexfile.production.connection.filename = 'server/database/db.sqlite3'

const knexInstance = knex(Object.assign(
  knexfile.production,
  knexSnakeCaseMappers()
))


Model.knex(knexInstance)


module.exports = Model

