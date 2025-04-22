import mongoose from "mongoose";
export const connectDB = async () => {
   try {
      const connect = await mongoose.connect(process.env.MONGO_URI as string)
      console.log(`MongoDB connected: ${connect.connection.host}`);
   } catch (error) {
      console.log(error.message);
      process.exit(1)
   }
}