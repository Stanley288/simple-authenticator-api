import redis from 'redis'
import log from '../utils/log'

class Redis {
  async connect(options) {
    if (options) {
      this.config = { ...this.config, ...options }
    }

    this.client = redis.createClient(this.config)
    this.client.on('error', (err) => {
      log.fatal(err)
    })
  }

  async disconnect() {
    this.client.quit()
  }

  async get(id) {
    return new Promise((resolve, reject) => {
      this.client.get(id, (err, value) => {
        if (err) {
          reject(err)
          return
        }

        resolve(value)
      })
    })
  }

  set(id, value) {
    this.client.set(id, value)
  }
}

export default new Redis()
