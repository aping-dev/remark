exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('remark', (table) => {
       table.uuid('uuid')
       table.string('article_id', 64).notNullable()
       table.string('nickname', 32).notNullable()
       table.timestamp('created_at').notNullable()
       table.string('content', 256).notNullable()
    })
}

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTableIfExists('remark')
}

exports.config = { transaction: false }
