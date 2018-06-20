import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/index'
import knex from '../src/db/connection'

chai.use(chaiHttp)

export async function migrateDB () {
  await knex.migrate.rollback()
  await knex.migrate.latest()
  await knex.seed.run()
}

export const server = app
export const registerModel = ['status', 'message', 'payload']
export const deviceModel = ['id', 'token', 'user_id', 'created_at']
export const devicesModel = ['id', 'user', 'createdAt', 'tokens']
export const tokenModel = ['token', 'createdAt']
export const tokenSentModel = ['token', 'createdAt', 'sent']
