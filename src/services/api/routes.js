import Router from 'koa-router'
import UsersRoutes from './users/routes'

const router = new Router()

UsersRoutes.init(router)

router.get('/api', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'push-service',
    version: '1.0.0',
    author: 'app development shop'
  }
})

export default router
