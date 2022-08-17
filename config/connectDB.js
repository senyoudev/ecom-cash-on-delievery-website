import mongoose from "mongoose";


const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        console.log(`MongoDB connected:${conn.connection.host}`)
    } catch(err) {
        console.log(`Error:${err.message}`)
        process.exit(1)
    }
}


export default connectDb