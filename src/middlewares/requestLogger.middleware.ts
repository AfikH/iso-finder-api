import morgan from "morgan";
import { Request, Response } from "express";

import logger from "@utils/logger.util";

const requestLogger = morgan(
  (tokens, req: Request, res: Response) => {
    return JSON.stringify({
      ip: req.ip,
      user_agent: req.headers["user-agent"],
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res) ?? "0"),
      content_length: tokens.res(req, res, "content-length"),
      response_time: Number.parseFloat(tokens["response-time"](req, res) ?? "0"),
    });
  },
  {
    stream: {
      write: (message) => {
        try {
          const data = JSON.parse(message);
          logger.http("incoming-request", data);
        } catch (err) {
          logger.warn("Malformed request log message", { raw: message });
        }
      },
    },
  }
);

export default requestLogger;
