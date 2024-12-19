import { Router } from "express";

const router= Router()
const moduleRoutes=[
    {
        path:"/test",
        route:"test"
    }
]

moduleRoutes.forEach(route=>router.use(route.path,route.route))

export default router;