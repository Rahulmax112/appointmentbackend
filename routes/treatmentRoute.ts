import { Elysia } from "elysia";
import {
  getAllTimeSlots,
  getAllTreatments,
} from "../controllers/treatmentController";

const treatmentRoutes = new Elysia()
  .get("/treatments", getAllTreatments)
  .post("/timeslots", getAllTimeSlots);

export default treatmentRoutes;
