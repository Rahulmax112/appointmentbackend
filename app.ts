import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { cookie } from '@elysiajs/cookie';
import swagger from "@elysiajs/swagger";
import treatmentRoutes from "./routes/treatmentRoute";
import doctorRoutes from "./routes/doctorRoute";
import appointmentRoutes from "./routes/appointmentRoute";
import userRoutes from "./routes/userRoute";

const app = new Elysia()
  .use(cors()).use(cookie())
  .use(
    swagger({
      path: '/swagger',
    })
  )
  .group('/api/v1', app => 
    app.use(treatmentRoutes).use(doctorRoutes).use(appointmentRoutes).use(userRoutes)
  );

export default app;
