const { Redis } = require('ioredis');

const {
  REDIS_URL,
} = process.env;

const redisConnection = new Redis(String(REDIS_URL));

module.exports = { redisConnection };
