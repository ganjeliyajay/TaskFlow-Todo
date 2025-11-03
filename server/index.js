import express, { json, urlencoded } from "express"
import cors from "cors"
import dotenv from 'dotenv'
import { db } from "./config/db.js"
import { AuthoRoutes } from "./routes/AuthRoutes.js"
import { TaskRoute } from "./routes/TaskRoute.js"
import cookieParser from "cookie-parser"


const app = express()
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const isProduction = process.env.NODE_ENV === "production";
app.use(cors({
    origin: isProduction
        ? [process.env.CLIENT_URL]                // ✅ only frontend URL on Render
        : ["http://localhost:5173"],             // ✅ local dev
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

const PORT = process.env.PORT || 4040

app.listen(PORT, () => console.log(`Server Is Runnend On : ${PORT}`))