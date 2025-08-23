import mongoose from "mongoose"

export const connectDB = async() => {
    try {
        const dbURI = process.env.MONGODB_URI;
        await mongoose.connect(dbURI)
        console.log("Conectado a Mongo")
    } catch(error){
        console.error("NO");
        process.exit (1);
    }
} 