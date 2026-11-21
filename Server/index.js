import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js"
import authRouter from "./routes/authrouter.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
const port = process.env.PORT || 5000

// 1. CORS first
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// 2. Body/cookie parsers
app.use(express.json())
app.use(cookieParser())

// 3. Routes last
app.use("/api/auth", authRouter)

app.listen(port, () => {
    console.log("server started")
    connectDB()
})
