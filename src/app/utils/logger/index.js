const { pino } = require('pino');

const environment = process.env.ENVIRONMENT || 'prod';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
  base: {
    pid: environment.toUpperCase(),
  },
  timestamp: () => `,"time":"${new Intl.DateTimeFormat('pt-br', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date())}"`,
});

module.exports = logger;
