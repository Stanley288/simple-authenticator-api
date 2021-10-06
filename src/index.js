import config from './config'
import log from './utils/log'
import Redis from './connectors/redis'
import app from './app'


const main = async () => {
  Redis.connect(config.redis)
  
  process
    .on('SIGTERM', async () => {
      Redis.disconnect()
      process.exit(0)
    })
    .on('SIGINT', async () => {
      Redis.disconnect()
      process.exit(0)
    })

  app.listen(config.port, () => {
    const { environment, port } = config

    log.info('lendesk-service started 🚀 🌚', { port, environment })
  })
}

main()
