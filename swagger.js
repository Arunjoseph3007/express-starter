const swaggerAutogen = require("swagger-autogen");
const fs = require("fs");

const doc = {
  info: {
    title: "Express Typescript starter",
    description:
      "An excellent starter setup with documentation using Swagger UI",
  },
  host: "localhost:8000",
  schemes: ["http"],
};

const outputFile = "swagger-output.json";
const endpointsFiles = [
  //$ Add any other file conatining express routes here
  'src/app.ts',
];

swaggerAutogen()(outputFile, endpointsFiles, doc);
