import httpStatus from 'http-status'

import { APIError } from '../utils/APIError'
import { setPassword } from './utils'
import Redis from '../connectors/redis'
import moment from 'moment'


const create = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const existingUser = await Redis.get(username)

    if (existingUser) {
      return next(new APIError('Username already exists.', httpStatus.BAD_REQUEST))
    }

    const { hash, salt } = await setPassword(password)
    const user = {
      username,
      hash,
      salt,
      createdAt: moment().format(),
    }

    Redis.set(username, JSON.stringify(user))
    res.status(httpStatus.CREATED).json({ username: user.username, createdAt: user.createdAt })
  } catch (err) {
    next(err)
  }
}

const authenticate = (req, res, next) => {
  try {
    const { user: { username, createdAt } } = req
    res.status(httpStatus.OK).json({ username, createdAt })
  } catch (err) {
    return err
  }
}

export default {
  create,
  authenticate,
}
