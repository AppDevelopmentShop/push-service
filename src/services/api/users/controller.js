import { pushSchema, timeSchema, tokenSchema } from '../models'
import { Exception } from '../../../utils/Exception.class'
import devices from '../../../db/queries/devices'
import logger from '../../../config/winston'
import notifications from '../../../db/queries/notifications'
import users from '../../../db/queries/users'
import sendPush from './helpers/sendPush'

async function unregister (ctx) {
  const { token, user } = ctx.params
  /* REMOVE TOKEN FROM DB */
  const device = await devices.remove(token, user)
  ctx.status = 200
  if (!device || !device[0]) {
    throw new Exception(404, 'Token not found')
  }
  ctx.body = { status: 'success', device: device[0] }
  logger.info('Device unregistered', { token, device: device[0] })
}

async function register (ctx) {
  const { error, value } = tokenSchema.validate(ctx.request.body)
  if (error) throw new Exception(400, 'Validation error!', error.details)
  const { token } = value
  const { user } = ctx.params
  /* ADD TOKEN TO DB */
  const device = await devices.add(user, token)
  ctx.status = 200
  ctx.body = { status: 'success', device: device[0] }
  logger.info('Device registered', { token, user, device })
}

async function confirm (ctx) {
  const { error, value } = timeSchema.validate(ctx.request.body)
  if (error) throw new Exception(400, 'Validation error!', error.details)
  const { time } = value
  const { user } = ctx.params
  /* CONFIRM NOTIFICATIONS AS READ */
  try {
    const notifications = await notifications.confirm(user, time)
    ctx.status = 200
    ctx.body = { status: 'success', notifications }
    logger.info('Notifications confirmed', { user, notifications })
  } catch (err) {
    throw new Exception(400, err.message)
  }
}

async function getAllUsers (ctx) {
  ctx.status = 200
  ctx.body = {
    status: 'success',
    data: await users.get()
  }
}

async function getAllUserNotifications (ctx) {
  const user = ctx.params.user
  ctx.status = 200
  ctx.body = {
    status: 'success',
    data: await notifications.get(user)
  }
}

async function getAllUserDevices (ctx) {
  const { user } = ctx.params
  const tokens = await users.getDevices(user)
  if (!tokens || !tokens[0].id) {
    throw new Exception(404, 'User not found')
  }
  ctx.status = 200
  ctx.body = tokens[0]
}

async function send (ctx) {
  const { error, value } = pushSchema.validate(ctx.request.body)
  if (error) throw new Exception(400, 'Validation error!', error.details)
  const { user } = ctx.params
  const tokens = await users.getDevices(user)
  if (!tokens || !tokens[0].id) {
    throw new Exception(404, 'User not found')
  }
  await sendPush(tokens[0], value)
  ctx.status = 200
  ctx.body = tokens[0]
}

export default {
  getAllUsers,
  getAllUserNotifications,
  getAllUserDevices,
  send,
  unregister,
  register,
  confirm
}
