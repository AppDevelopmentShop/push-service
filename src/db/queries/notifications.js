import knex, { TABLES as T } from '../connection'
import statuses from './statuses'
import users from './users'

async function get (userId) {
  const user = await users.getUser(userId)
  return knex
    .select({
      status: 's.name',
      title: 'n.title',
      body: 'n.body',
      color: 'n.color',
      ttl: 'n.ttl',
      badge: 'n.badge',
      createdAt: 'n.created_at'
    })
    .from({ n: T.NOTIFICATIONS })
    .leftJoin({ s: T.STATUSES }, 's.id', 'n.status_id')
    .where('n.user_id', user)
}

async function confirm (userId, time) {
  const user = await users.getUser(userId)
  const date = time ? new Date(time) : new Date()
  return knex(T.NOTIFICATIONS)
    .where('user_id', user)
    .where('created_at', '<', date)
    .whereNotNull('read_at')
    .update({ read_at: date })
    .returning('*')
}

async function add (userId, info, statusName) {
  const status = await statuses.getByName(statusName)
  const history = {
    user_id: userId,
    status_id: status.id,
    title: info.title,
    body: info.body,
    color: info.color,
    ttl: info.ttl,
    badge: info.badge
  }
  return knex(T.NOTIFICATIONS)
    .insert(history)
    .returning('*')
}

export default {
  confirm,
  add,
  get
}
