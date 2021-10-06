export default {
  version: process.env.VERSION ?? 'development',
  environment: process.env.ENVIRONMENT ?? 'development',
  port: process.env.PORT ?? 8080,

  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
  },
}
