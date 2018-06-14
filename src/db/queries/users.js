import knexnest from 'knexnest'
import { TABLES as T } from '../connection'
import knex from '../connection'

async function getDevices (user) {
  const sql = knex
    .select({
      _id: 'u.id',
      _user: 'u.token',
      _createdAt: 'u.created_at',
      _tokens__token: 'ud.token',
      _tokens__createdAt: 'ud.created_at',
    })
    .from(function () {
      this.from({ u: T.USERS })
        .where('u.token', user)
        .as('u')
    })
    .leftJoin({ ud: T.DEVICES }, 'ud.user_id', 'u.id')
  return knexnest(sql)
}

async function getUser (user) {
  return knex
    .first('id')
    .from(T.USERS)
    .where('token', user)
}

async function get () {
  return knex
    .select('*')
    .from(T.USERS)
}

async function add (token) {
  return knex(T.USERS)
    .insert({ token })
    .returning('*')
}

export default {
  getDevices,
  getUser,
  add,
  get
}
