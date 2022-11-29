import express, { Application } from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import ErrorMiddleware from "@/middleware/error";
import swaggerUI from "swagger-ui-express";
import path from "path";

import BookController from "@/resources/books/books.routes";

const swaggerDocument = require("../swagger-output");

//& Express Application
export default class ExpressApplication {
  public express: Application;
  public port: number;

  //$ Driver code
  constructor( port: number) {
    this.express = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeBasicRoutes();
    this.initializeErrorHandling();
  }

  //$ Basic middlewares
  private initializeMiddlewares(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  //$ Setup all resource controllers
  private initializeControllers(): void {
    this.express.use("/api/books", BookController.router /* #swagger.tags=['Book'] */);
  }

  //$ Some basic routes - welcome, docs, etc
  private initializeBasicRoutes() {
    this.express.use("/health-check", (req, res) => {
      // # swagger.ignore=true
      res.json("Hey welcome to the api");
    });
    this.express.use(express.static(path.join(__dirname, '../public')))
    this.express.use(
      "/api-docs",
      swaggerUI.serve,
      swaggerUI.setup(swaggerDocument)
    );
  }

  //$ Error handling
  private initializeErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  //$ Start
  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App running at http://localhost:${this.port}`);
    });
  }
}
