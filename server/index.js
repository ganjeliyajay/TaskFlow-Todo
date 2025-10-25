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
    origin: ['https://taskflow-todo-web.netlify.app', 'http://localhost:5173'], // your Vite frontend
    credentials: true,
}));


// Call The Database
db()

app.get('/flowtrack/user/test', (req, res) => {
    res.json({ msg: "Backend is alive!" });
});


app.use('/flowtrack/task', TaskRoute)
//url 
app.use('/flowtrack/user', AuthoRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server Is Runnend On : ${PORT}`))