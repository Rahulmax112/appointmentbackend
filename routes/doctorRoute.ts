import { Elysia } from 'elysia';
import { getAllDoctors } from '../controllers/doctorController';

const doctorRoutes = new Elysia()
  .get('/doctors', getAllDoctors);

export default doctorRoutes;