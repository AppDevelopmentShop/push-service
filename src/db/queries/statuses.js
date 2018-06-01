import { TABLES as T } from '../connection'
import knex from '../connection'

async function getByName (name) {
  return knex
    .first('*')
    .from({ s: T.STATUSES })
    .where('s.name', name)
}

export default {
  getByName
}
