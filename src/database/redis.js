const { Redis } = require('@upstash/redis');

const redisConnection = Redis.fromEnv();

module.exports = { redisConnection };
