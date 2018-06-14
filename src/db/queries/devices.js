import { TABLES as T } from '../connection'
import knex from '../connection'
import users from './users'

async function add (userId, token) {
  let user = await users.getUser(userId)
  if (!user) {
    const res = await users.add(userId)
    user = res[0]
  }
  await removeSingle(token)
  return knex(T.DEVICES)
    .insert({ user_id: user.id, token })
    .returning('*')
}

async function remove (token, userToken) {
  const user = await users.getUser(userToken)
  if (!user) {
    return null
  }
  return knex(T.DEVICES)
    .del()
    .where({ token, user_id: user.id })
    .returning('*')
}

async function removeSingle (token) {
  return knex(T.DEVICES)
    .del()
    .where({ token })
    .returning('*')
}

export default {
  add,
  remove
}
