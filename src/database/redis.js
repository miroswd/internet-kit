const { createClient } = require('redis');
const { logger } = require('../app/utils');

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} = process.env;

const redisConnection = createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});

redisConnection.connect().then((_) => {
  logger.info('Redis connected');
}).catch((err) => {
  logger.error(err, 'Failed to connect redis');
});

module.exports = { redisConnection };
