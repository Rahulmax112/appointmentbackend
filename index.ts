import { Elysia } from 'elysia';
import app from './app';

new Elysia()
  .use(app)
  .listen(3000);

console.log('🚀 Server listening on http://localhost:3000');
