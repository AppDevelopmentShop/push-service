import { TABLES } from '../connection'

export const seed = async function (knex) {
  if (process.env.NODE_ENV !== 'test') {
    return
  }
  await knex(TABLES.DEVICES).del()
  for (let i = 0, max = items.length; i < max; i++) {
    await knex(TABLES.DEVICES).insert(items[i])
  }
}

let items = [
  { token: 'device1', user_id: 1 },
  { token: 'device2', user_id: 2 },
  { token: 'device22', user_id: 2 }
]
