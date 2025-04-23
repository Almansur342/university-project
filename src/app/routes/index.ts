import { Router } from "express";
import { StudentRoutes } from "../students/student.route";
import { UserRoutes } from "../user/user.route";
import { AuthRoutes } from "../auth/auth.route";

const router = Router();
const moduleRoutes = [
  {
    path:'/users',
    route: UserRoutes
  },
  {
    path:'/students',
    route: StudentRoutes
  },
  {
    path:'/auth',
    route: AuthRoutes
  },
  
]
moduleRoutes.forEach(route=>router.use(route.path,route.route))


export default router