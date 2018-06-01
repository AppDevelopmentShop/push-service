import { TABLES as T } from '../connection'
import knex from '../connection'
import users from './users'

async function add (user, token) {
  let res = await users.getByToken(user)
  if (!res || !res[0] || !res[0].id) {
    res = await users.add(user)
  }
  await remove(token)
  return knex(T.DEVICES)
    .insert({ user_id: res[0].id, token })
    .returning('*')
}

async function remove (token) {
  return knex(T.DEVICES).del().where({ token })
}

export default {
  add,
  remove
}
