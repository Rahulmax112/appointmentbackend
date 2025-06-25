import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

import swagger from "@elysiajs/swagger";
import treatmentRoutes from "./routes/treatmentRoute";

const app = new Elysia()
  .use(
    swagger({path: 'prompts-api/v1'})
  )
  .use(cors());


treatmentRoutes(app)


export default app;
