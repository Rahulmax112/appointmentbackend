import { Elysia } from 'elysia';
import swagger from '@elysiajs/swagger';
import treatmentRoutes from './routes/treatment.route.js';

export const app = new Elysia()
  .use(swagger())       // Opens /swagger
  .group('/api/v1', (app) => {
    treatmentRoutes(app);
  });
