const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// require('../routes/StudentRegistryApi')
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Registry API',
      version: '1.0.0',
      description: 'API documentation for the Student Registry',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['index.js','routes/StudentRegistryApi.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};