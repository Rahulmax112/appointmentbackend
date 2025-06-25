import { Elysia } from 'elysia';
import { getAllTreatments } from '../controllers/treatmentController';

const treatmentRoutes = new Elysia()
  .get('/treatments', getAllTreatments);

export default treatmentRoutes;
