import express,{Application} from 'express'
import cors from 'cors'
import router from './app/routes'
const app:Application =express()

// parser 

app.use(express.json())
app.use(cors())

// application router 
// app.use('/api',router)

app.use('/',(req,res)=>{
    res.json({message:"welcome to my backend project"})
})

export default app