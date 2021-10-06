import bunyan from 'bunyan'

const log = bunyan.createLogger({
  name: 'lendesk-service',
})

export default log
