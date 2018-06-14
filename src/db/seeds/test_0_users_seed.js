import { TABLES } from '../connection'

export const seed = async function (knex) {
  if (process.env.NODE_ENV !== 'test') {
    return
  }
  await knex(TABLES.USERS).del()
  for (let i = 0, max = items.length; i < max; i++) {
    await knex(TABLES.USERS).insert(items[i])
  }
}

let items = [
  { token: 'user1' },
  { token: 'user2' }
]
