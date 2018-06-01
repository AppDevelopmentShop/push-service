import Joi from 'joi'
import { Exception } from '../../../utils/Exception.class'
import users from '../../../db/queries/users'


const schema = Joi.object().keys({
  user: Joi.string().required().trim().min(2).max(256),
  title: Joi.string().required().trim().min(2).max(256),
  body: Joi.string().required().trim().min(2).max(256),
  color: Joi.string().trim().min(4).max(7),
  ttl: Joi.integer(),
  badge: Joi.integer()
})

async function send (ctx) {
  const { error, value } = schema.validate(ctx.request.body)
  if (error) throw new Exception(400, 'Validation error!', error.details)
  try {
    const token = await users.getByDevice(value.user)
    if (!token) {
      throw new Exception(400, 'User not found')
    }
    send(id, token, info)
  } catch (err) {
    throw new Exception(400, err.message)
  }
  ctx.status = 200
  ctx.body = {
    status: 'success'
  }
}

export default {
  send
}
