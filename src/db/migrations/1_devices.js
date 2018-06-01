import { TABLES } from '../connection'

export const up = (knex, Promise) => {
  return knex.schema.createTable(TABLES.DEVICES, (table) => {
    table.increments()
    table.string('token', 256).notNullable().unique()
    table.integer('user_id').references(`${TABLES.USERS}.id`).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export const down = (knex, Promise) => {
  return knex.schema.dropTable(TABLES.DEVICES)
}
