import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { checkPassword } from '../users/utils'
import Redis from '../connectors/redis'
import APIError from './APIError'
import httpStatus from 'http-status'

passport.use(new BasicStrategy(async (username, password, done) => {
  let user = await Redis.get(username)
  user = JSON.parse(user)

  if (!user) {
    return done(new APIError('User does not exist', httpStatus.UNAUTHORIZED ), false)
    // return done(new Error('sucka'))
  }

  const { hash, salt } = user
  const isAuthenticated = await checkPassword({ password, hash, salt })

  if (!isAuthenticated) {
    return done(new APIError('Incorrect password', httpStatus.UNAUTHORIZED), false)
  }

  // authentication passed, return user object
  return done(null, user)
}))

export default passport
