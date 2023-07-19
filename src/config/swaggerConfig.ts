import { resolve } from 'path';

export default {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação - API ena_food',
      version: '1.0.0',
      description: 'Documentação da API do projeto ena_food.',
    },
    servers: [
      {
        url: `${process.env.URL_API}:${process.env.PORT}`,
        description: 'local',
      },
      {
        url: `${process.env.URL_API_SERVER_SWAGGER}`,
        description: 'online - sem servidor',
      },
    ],
  },
  apis: [resolve(__dirname, '..', '..', 'docs', '**', '*.yml')],
};
