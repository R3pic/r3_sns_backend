// src/swaggerOptions.ts
import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Documentation for the application',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api`,
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};

export default swaggerOptions;
