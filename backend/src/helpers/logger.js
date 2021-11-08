const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const { LOG_LEVEL } = require('../constants');

const { colorize, combine, errors, json, printf, simple, splat, timestamp } =
  format;

const logger = createLogger({
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    json(),
    splat()
  ),
  transports: [
    new transports.DailyRotateFile({
      level: LOG_LEVEL.INFO,
      filename: 'logs/%DATE%.log'
    }),
    new transports.Console({
      level: LOG_LEVEL.DEBUG,
      format: combine(
        colorize(),
        simple(),
        timestamp(),
        printf(
          info =>
            `[${info.timestamp}] ${info.level}: ${
              info.stack ? `${info.message}\n${info.stack}` : info.message
            }`
        )
      )
    })
  ]
});

module.exports = logger;
