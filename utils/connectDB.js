import mongoose from "mongoose";

let connected = false;

export default async function connectDB() {
   if (connected) {
      return;
   }
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      connected = true;
   } catch (e) {
      console.error(`Error: ${e.message}`);
   }
}
