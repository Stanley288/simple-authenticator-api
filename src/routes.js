import doctor from 'doctor-zhivago'
import { Router } from 'express'

import users from './users/route'
import config from './config'

const router = new Router()

// healthcheck
router.get('/', doctor({
  service: 'lendesk service',
  version: config.version,
  redis: { type: 'redis', hostname: config.redis.host },
}))

router.use('/users', users)

export default router
