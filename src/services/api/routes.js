import Router from 'koa-router'
import NotificationsRoutes from './notifications/routes'

const router = new Router()

NotificationsRoutes.init(router)

router.get('/api', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'push-service'
  }
})

export default router
