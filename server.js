import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import dotenv from "dotenv"
import productRoutes from './routes/productionRoutes.js'
import { sql } from "./config/db.js"

const app = express()
const PORT = process.env.PORT || 3000
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

app.use('/api/products', productRoutes)

async function initDB() {
    try {
        await sql`
          CREATE TABLE IF NOT EXISTS products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `
        console.log("databse init success")
    } catch (error) {
        console.log("Error in DB", error)
    }
}

initDB(() => {
    app.listen(PORT, () => {
        console.log('Server is running on PORT', + PORT)
    })
})