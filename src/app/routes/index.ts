import { Router } from "express";
import authRouter from "../modules/Auth/auth.router";
import blogRouter from "../modules/Blog/blog.router";
import adminRouter from "../modules/Admin/admin.router";

const router= Router()
const moduleRoutes=[
    {
        path:"/auth",
        route:authRouter
    },
    {
        path:"/blogs",
        route:blogRouter
    },
    {
        path:"/admin",
        route:adminRouter
    }
]

moduleRoutes.forEach(route=>router.use(route.path,route.route))

export default router;