const { createClient } = require('@vercel/kv');

const {
  KV_REST_API_URL,
  KV_REST_API_TOKEN,
} = process.env;

const redisConnection = createClient({
  url: KV_REST_API_URL,
  token: KV_REST_API_TOKEN,
});

module.exports = { redisConnection };
