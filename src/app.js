import express from 'express'
import cors from 'cors'
import woodie from 'woodie'
import httpStatus from 'http-status'
import { ValidationError } from 'express-validation'
import passport from 'passport'

import { mapAPIErrorToJson, APIError } from './utils/APIError'
import config from './config'
import routes from './routes'
import './utils/passport'

// create Express server
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With,Content-Type, Accept',
  )
  next()
})
app.use(passport.initialize())

// mount all routes on / path
app.use('/', routes)

// enable logging
if (config.environment !== 'development') {
  app.use(woodie())
}

app.use((err, req, res, next) => {
  // if error is a validation error, show error message
  if (err instanceof ValidationError) {
    return res.status(httpStatus.BAD_REQUEST).json(err)
    // if error is NOT an instanceOf APIError, convert it
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status)
    return next(apiError)
  }

  return next(err)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new APIError('Route Not Found', httpStatus.NOT_FOUND)

  return next(error)
})

// error handler, send stacktrace only during development
app.use((err, req, res, next) =>
  res.status(err.status).json(mapAPIErrorToJson(err))
)

export default app