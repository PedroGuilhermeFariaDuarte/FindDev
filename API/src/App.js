require("dotenv").config();
import http from "http";
import express from "express";

import { json } from "body-parser";
import cors from "cors";

// Routes
import Router from "./routes";

// Database
import "./database";

// Utils
import { setupWebsocket } from "./utils/WebSocket";

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);
    this.middlewares();
    this.routes();
  }

  middlewares() {
    setupWebsocket(this.server);
    this.app.use(cors());
    this.app.use(json());
  }

  routes() {
    this.app.use(Router);
  }
}

export default new App().server;
