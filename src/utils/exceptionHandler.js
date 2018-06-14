import { Exception } from './Exception.class'
import logger from '../config/winston'

export default async (ctx, next) => {
  try {
    return await next()
  } catch (err) {
    if (err instanceof Exception) {
      logger.error(err.toObject())
      ctx.body = err.toObject()
      ctx.status = err.statusCode
    } else {
      logger.error(err.message)
      ctx.body = { message: 'Unexpected error' }
      ctx.status = 500
    }
  }
}
