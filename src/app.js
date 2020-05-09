import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import mongoose from "mongoose";

import customersRouter from "./customers/router";
import config from "./config";

const api = express();

api.use(cors());
api.use(compression());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

api.use("/customers", customersRouter);

api.use("/", (req, res) => {
  res.send({
    status: "ok",
  });
});

mongoose
  .connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    api.listen(config.server.port, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      // output the status of the api in the terminal
      console.info(
        `API is now running on port ${config.server.port} in ${config.env} mode`
      );
    });
  });
