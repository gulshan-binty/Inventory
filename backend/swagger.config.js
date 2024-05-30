// swaggerConfig.js
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "API documentation for your Express application",
    },
    servers: [
      {
        url: "http://localhost:5000", // Change this to your server's URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
