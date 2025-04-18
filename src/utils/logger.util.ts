import winston from "winston";

const { combine, colorize, timestamp, printf, errors, json } = winston.format;

const consoleFormat = combine(
  colorize(),
  timestamp(),
  printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
  })
);

const fileFormat = combine(errors({ stack: true }), timestamp(), json());

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "http",
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    new winston.transports.File({
      format: fileFormat,
      dirname: "logs",
      filename: "app.log",
    }),
    new winston.transports.File({
      format: fileFormat,
      dirname: "logs",
      filename: "http.log",
      level: "http",
    }),
    new winston.transports.File({
      format: fileFormat,
      dirname: "logs",
      filename: "error.log",
      level: "error",
    }),
  ],
});

export default logger;
