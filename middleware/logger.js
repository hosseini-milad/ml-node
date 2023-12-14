const winston = require('express-winston');
const CustomTransport = require('./winstonTransport');

const logger = winston.logger({
  requestWhitelist: ['headers', 'query'],
  //format: winston.format.json(),
  transports: [
    new CustomTransport(),
  ],
}
);
module.exports = logger;
