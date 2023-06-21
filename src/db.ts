import mongoose, { ConnectOptions }  from "mongoose";

import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const MONGODB_URI = process.env.MONGODB_URI;

const connect = () => {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as ConnectOptions);
      
    mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
    });

    mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    });
}

export default connect;