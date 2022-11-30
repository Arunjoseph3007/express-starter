const swaggerAutogen = require("swagger-autogen")()

const doc = {
  info: {
    title: "Express Typescript starter",
    description:
      "An excellent starter setup with documentation using Swagger UI",
  },
  host: "localhost:8000",
  schemes: ["http"],
  definitions: {
    //$ Add definitions for resources matching to prisma schema
    //@ Book
    Book: {
      id: "clb3j3xn50008yutbw13cjufb",
      name: "Harry porter",
      userId: "clb3j0ur00000yutbm8im7vmu",
      createdAt: "2022-11-30T10:52:26.514Z",
      updatedAt: "2022-11-30T10:52:10.144Z",
    },
    //@ User
    User: {
      id: "clb3j0ur00000yutbm8im7vmu",
      username: "Harry Porter",
      email: "abcd.xyz@gmail.com",
    },
  },
};

const outputFile = "swagger-output.json";
const endpointsFiles = [
  //$ Add any other file conatining express routes here
  "src/app.ts",
];

swaggerAutogen(outputFile, endpointsFiles, doc);
