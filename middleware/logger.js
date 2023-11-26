const winston = require('winston');
const CustomTransport = require('./winstonTransport');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new CustomTransport(),
  ],
});
module.exports = logger;
