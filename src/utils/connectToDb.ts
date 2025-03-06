import mongoose from "mongoose";

// Load MongoDB connection string from environment variables
const MONGO_URI: string | undefined = process.env.MONGODB_URI;
if (!MONGO_URI) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

// Connection event listeners for logging and debugging
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB connection lost. Attempting to reconnect...");
});
mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
});

// Connect to MongoDB with retry logic for initial connection
export const connectToDb = async (): Promise<typeof mongoose> => {
  const connectWithRetry = async (): Promise<typeof mongoose> => {
    try {
      return await mongoose.connect(MONGO_URI!);
    } catch (error) {
      console.error(`Failed to connect to MongoDB: ${error}`);
      await new Promise((res) => setTimeout(res, 5000));
      console.log("Retrying MongoDB connection...");
      return connectWithRetry();
    }
  };

  const mongooseInstance = await connectWithRetry();
  console.log("MongoDB connection established");
  return mongooseInstance;
};

// Gracefully close the Mongoose connection on process termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to app termination");
  process.exit(0);
});
