import Express from "express";
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

dotenv.config()
const port = process.env.PORT || 5000;


connectDB();

const app = Express()

app.use('/api/users',userRoutes)

app.get('/', (req, res) => res.send('Server is ready'))

app.use(notFound)
app.use(errorHandler)

app.listen(port,() => console.log(`Server started on port ${port}`))