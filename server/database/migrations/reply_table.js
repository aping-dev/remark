exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('reply', (table) => {
       table.uuid('uuid')
       table.string('article_id', 64).notNullable()
       table.uuid('ancestor_id').notNullable()
       table.string('reply_to', 32).notNullable()
       table.string('nickname', 32).notNullable()
       table.timestamp('created_at').notNullable()
       table.string('content', 256).notNullable()
    })
}

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTableIfExists('reply')
}

exports.config = { transaction: false }
