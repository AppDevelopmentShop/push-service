import Router from 'koa-router'
import api from './queries'
import { send } from './firebase'
import logger from '../../config/winston'

const router = new Router()
const ROUTE = '/admin/send'


async function sentPushToUser (id, user, info) {
  for (let i = 0; i < user.tokens.length; i++) {
    try {
      const response = await send(info, user.tokens[i].token)
      await api.addToHistory(id, user.id, 'sent')
      logger.info('Successfully sent message', {
        user,
        id: info.id,
        response
      })
    } catch (err) {
      await api.addToHistory(id, user.id, 'error')
      logger.error('Error sending message', {
        user,
        id: info.id,
        err
      })
    }
  }
}

router.post(ROUTE, async function (ctx) {
  const { id, users, payload } = ctx.request.body
  if (!id || !users) {
    return setError(ctx, '(id), (users) fields is required')
  }
  if (!users.length) {
    return setError(ctx, '(users) must be array and not empty')
  }
  const notification = await getNotificationById(id)
  if (!notification) {
    return setError(ctx, '(id) must be valid id of notification type')
  }
  try {
    const userArr = await api.getUsersTokens(users)
    if (!userArr) {
      return setError(ctx, 'Users not found!')
    }
    const info = await generateInfo(notification, payload)
    for (let i = 0; i < userArr.length; i++) {
      sentPushToUser(id, userArr[i], info)
    }
  } catch (err) {
    console.log(err)
    setError(ctx, err.message)
  }
  setSuccess(ctx)
})

function setError (ctx, message, status, payload) {
  status = status || 400
  message = message || 'Something went wrong'
  const log = {
    ip: ctx.request.ip,
    status,
    comment: message,
    body: ctx.request.body
  }
  if (payload) {
    log.payload = payload
  }
  logger.error(`post ${ROUTE}`, log)
  ctx.status = status
  ctx.body = {
    status: 'error',
    message: message
  }
}

function setSuccess (ctx, message, result) {
  logger.info(`post ${ROUTE}`, {
    ip: ctx.request.ip,
    comment: message,
    body: ctx.request.body,
    result
  })
  ctx.status = 200
  ctx.body = {
    status: 'success'
  }
}

export default router
