import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import treatmentRoutes from "./routes/treatmentRoute";
import doctorRoutes from "./routes/doctorRoute";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      path: '/swagger',
    })
  )
  .group('/api/v1', app => 
    app.use(treatmentRoutes).use(doctorRoutes)
  );

export default app;
