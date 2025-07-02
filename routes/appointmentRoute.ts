import { Elysia } from 'elysia';
import { getAllDoctors } from '../controllers/doctorController';

const appointmentRoutes = new Elysia()
  .get('/doctors', getAllDoctors);

export default appointmentRoutes;