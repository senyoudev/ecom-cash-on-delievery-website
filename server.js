import express from "express";
import dotenv from "dotenv"
import path from 'path'
import connectDb from "./config/connectDB.js";
import userRoutes from './routes/userRoutes.js'
import productsRoutes from './routes/productsRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


dotenv.config()

connectDb()


const app = express()
app.use(express.json())

app.get('/',(req,res) => {
    res.send("API is running...")
})

//routes
const __dirname = path.resolve()
console.log(__dirname)
app.use('/api/products',productsRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/users',userRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))






const port = process.env.PORT || 9000

app.listen(port,console.log(`Server running on ${port}...`))