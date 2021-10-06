import { Router } from 'express'
import { validate } from 'express-validation'
import passport from 'passport'

import controller from './controller'
import validator from './validator'

const authenticate = passport.authenticate('basic', { session: false })

const router = new Router()

router.route('/')
  .get(authenticate, controller.authenticate)
  .post(validate(validator.create), controller.create)

export default router
