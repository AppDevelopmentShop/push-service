import { TABLES } from '../connection'

export const up = (knex) => {
  return knex.schema.createTable(TABLES.NOTIFICATIONS, (table) => {
    table.increments()
    table.integer('user_id').references(`${TABLES.USERS}.id`).notNullable()
    table.integer('status_id').references(`${TABLES.STATUSES}.id`).notNullable()
    table.string('title', 64).notNullable()
    table.string('body', 512).notNullable()
    table.string('color', 7)
    table.integer('ttl')
    table.integer('badge')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('read_at')
  })
}

export const down = (knex, Promise) => {
  return knex.schema.dropTable(TABLES.NOTIFICATIONS)
}
