import knex from 'knex'
import config from './knexfile.js'
import { NODE_ENV } from '../config/env.config'

export const TABLES = {
  USERS: 'users',
  DEVICES: 'devices',
  STATUSES: 'statuses',
  NOTIFICATIONS: 'notifications'
}

export default knex(config[NODE_ENV])
