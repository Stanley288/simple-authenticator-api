import bunyan from 'bunyan'

const log = bunyan.createLogger({
  name: 'simple-authentication-api',
})

export default log
