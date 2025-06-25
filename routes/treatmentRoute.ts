import type { Elysia } from 'elysia';
import { getAllTreatments } from '../controllers/treatmentController';

export default function treatmentRoutes(app: Elysia) {
  app.get('/treatments', getAllTreatments);
}
