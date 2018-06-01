import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './services/api/routes'
import exceptionHandler from './utils/exceptionHandler'
import { PORT, NODE_ENV } from './config/env.config'

const app = new Koa()

app
  .use(bodyParser())
  .use(exceptionHandler)
  .use(router.routes())

export default app.listen(PORT, () => {
  console.log(`HTTP Server listening on port: ${PORT}`)
  console.log(`Environment: ${NODE_ENV}`)
})
