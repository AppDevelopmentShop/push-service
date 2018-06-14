'use strict'

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './services/api/routes'
import exceptionHandler from './utils/exceptionHandler'
import { PORT, NODE_ENV } from './config/env.config'
import logger from './config/winston'

const app = new Koa()

app
  .use(bodyParser())
  .use(exceptionHandler)
  .use(router.routes())

export default app.listen(PORT, () => {
  logger.debug(`HTTP Server listening on port: ${PORT}`)
  logger.debug(`Environment: ${NODE_ENV}`)
})
