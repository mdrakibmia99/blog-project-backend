import express,{Application, Request, Response} from 'express'
import cors from 'cors'
import router from './app/routes'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler'
const app:Application =express()

// parser 

app.use(express.json())
app.use(cors())

// application router 
// app.use('/api',router)

app.use('/',(req,res)=>{
    res.json({message:"welcome to my backend project"})
})
app.use(globalErrorHandler)

app.use("*", (req: Request, res: Response) => {
    res.status(404).json({
      status: false,
      message: 'Route not found'
    })
  })
export default app