import Joi from 'joi'
import { Exception } from '../../../utils/Exception.class'
import devices from '../../../db/queries/devices'
import logger from '../../../config/winston'
import notifications from '../../../db/queries/notifications'

const schema = Joi.object().keys({
  token: Joi.string().required().trim().min(2).max(256),
  user: Joi.string().required().trim().min(2).max(256)
})

async function unregister (ctx) {
  const { error, value } = schema.validate(ctx.request.body)
  if (error) throw new Exception(400, 'Validation error!', error.details)
  const { token } = value
  /* ROMOVE TOKEN FROM DB */
  try {
    await devices.remove(token)
    ctx.status = 200
    ctx.body = { status: 'success' }
    logger.info(`Device unregistered: ${token}`)
  } catch (err) {
    throw new Exception(400, err.message, err)
  }
}

async function register (ctx) {
  const { error, value } = schema.validate(ctx.request.body)
  if (error) throw new Exception(400, 'Validation error!', error.details)
  const { token, user } = value
  /* ADD TOKEN TO DB */
  try {
    await devices.add(user, token)
    ctx.status = 200
    ctx.body = { status: 'success' }
    logger.info(`Device registered: ${token} with user: ${user}`)
  } catch (err) {
    throw new Exception(400, err.message)
  }
}

async function confirm (ctx) {
  const { error, value } = schema.validate(ctx.request.body)
  if (error) throw new Exception(400, 'Validation error!', error.details)
  const { token, user } = value
  /* CONFIRM NOTIFICATIONS AS READ */
  try {
    await notifications.confirm(token)
    ctx.status = 200
    ctx.body = { status: 'success' }
    logger.info(`Notifications confirmed, token: ${token} with user: ${user}`)
  } catch (err) {
    return setError(ctx, err.message, null, err)
  }
}

export default {
  unregister,
  register,
  confirm
}
