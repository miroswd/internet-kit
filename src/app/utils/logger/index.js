const { pino } = require('pino');

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
  timestamp: true,
});

module.exports = logger;
