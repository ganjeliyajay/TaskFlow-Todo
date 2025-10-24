import express, { json, urlencoded } from "express"
import cors from "cors"
import dotenv from 'dotenv'
import { db } from "./config/db.js"
import { AuthoRoutes } from "./routes/AuthRoutes.js"
import { TaskRoute } from "./routes/TaskRoute.js"
import cookieParser from "cookie-parser"


const app = express()
dotenv.config()

app.use(json(), urlencoded({ extended: true }), cookieParser())
app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true               // allow sending cookies
}))


// Call The Database
db()


app.use('/flowtrack/task', TaskRoute)
//url 
app.use('/flowtrack/user', AuthoRoutes)

const PORT = process.env.PORT 
app.listen(PORT, () => console.log(`Server Is Runnend On : ${PORT}`))