import knexnest from 'knexnest'
import { TABLES as T } from '../connection'
import knex from '../connection'

async function getUsersTokens (users) {
  const sql = knex
    .select({
      _id: 'u.id',
      _tokens__token: 'ud.token'
    })
    .from(function () {
      this.from({ u: T.USERS })
        .whereIn('u.token', users)
        .as('u')
    })
    .leftJoin({ ud: T.DEVICES }, 'ud.user_id', 'u.id')
  return knexnest(sql)
}

async function add (token) {
  return knex(T.USERS)
    .insert({ token })
    .returning('*')
}

async function getByToken (token) {
  return knex.select('id')
    .from(T.USERS)
    .where('token', token)
}

async function getByDevice (token) {
  return knex
    .select({
      id: 'u.id'
    })
    .from(function () {
      this.from({ d: T.DEVICES })
        .where('d.token', token)
        .as('d')
    })
    .join({u: T.USERS}, 'd.user_id', 'u.id')
}

export default {
  getUsersTokens,
  getByDevice,
  getByToken,
  add
}
