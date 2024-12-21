import { Router } from "express";
import authRouter from "../modules/Auth/auth.router";

const router= Router()
const moduleRoutes=[
    {
        path:"/auth",
        route:authRouter
    }
]

moduleRoutes.forEach(route=>router.use(route.path,route.route))

export default router;