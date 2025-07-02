import Elysia from "elysia";
import { Login, Register } from "../controllers/userController";

const userRoutes = new Elysia().post('/user', Register ).post('/login', Login)

export default userRoutes;