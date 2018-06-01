import knex, { TABLES as T } from '../connection'
import statuses from './statuses'
import users from './users'

async function confirm (token) {
  const user = await users.getByDevice(token)
  return knex(T.NOTIFICATIONS)
    .where('user_id', user)
    .update({ read_at: new Date() })
    .returning('*')
}

async function add (notification, userId, statusName) {
  const status = await statuses.getByName(statusName)
  const history = {
    user_id: userId,
    status_id: status.id,
    title: notification.title,
    body: notification.body,
    color: notification.color,
    ttl: notification.ttl,
    badge: notification.badge
  }
  return knex(T.NOTIFICATIONS)
    .insert(history)
    .returning('*')
}

export default {
  confirm,
  add
}
