const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Presentation API",
      version: "1.0.0",
      description: "API for managing presentations and slides",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["../routes/*.js", "./docs/presentationSwagger.js"], // Point to the routes where Swagger annotations are defined
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerConfig(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerConfig;
