import httpStatus from 'http-status'

export class APIError extends Error {
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.status = status
    Error.captureStackTrace(this, this.constructor.name)
  }
}

export function mapAPIErrorToJson(apiError) {
  const json = {
    message: apiError.message,
    errors: apiError.errors,
  }

  if (process.env.NODE_ENV !== 'production') {
    json.stack = apiError.stack
  }

  return json
}

export default APIError
