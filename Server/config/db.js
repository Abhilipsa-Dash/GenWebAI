import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const connectDB=async ()=>{
    // a statement for handling errors
    try {
       await mongoose.connect(process.env.MONGO_URI) 
       console.log("db connected")
    } catch (error) {
        console.log("db error")
    }
}
export default connectDB