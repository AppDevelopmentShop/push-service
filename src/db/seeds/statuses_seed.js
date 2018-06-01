import { TABLES } from '../connection'

export const seed = async function (knex) {
  if ((await knex(TABLES.STATUSES).select('*')).length) {
    return
  }
  await knex(TABLES.STATUSES).del()
  for (let i = 0, max = items.length; i < max; i++) {
    await knex(TABLES.STATUSES).insert(items[i])
  }
}

let items = [
  { name: 'sent' },
  { name: 'error' }
]
