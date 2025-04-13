import mongoose from "mongoose";

// Load MongoDB connection string from environment variables
const MONGO_URI: string | undefined = process.env.MONGODB_URI;
if (!MONGO_URI) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

// Maintain a connection status to prevent multiple connections
let isConnected = false;

// Function to connect to MongoDB
export const connectToDb = async (): Promise<typeof mongoose> => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return mongoose;
  }

  try {
    const mongooseInstance = await mongoose.connect(MONGO_URI);

    isConnected = true;
    console.log("MongoDB connection established");

    return mongooseInstance;
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error}`);
    throw error;
  }
};

// Attach event listeners **only once**
if (mongoose.connection.listeners("connected").length === 0) {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });
}

if (mongoose.connection.listeners("error").length === 0) {
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
}

if (mongoose.connection.listeners("disconnected").length === 0) {
  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB connection lost. Attempting to reconnect...");
  });
}

if (mongoose.connection.listeners("reconnected").length === 0) {
  mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected");
  });
}

// Gracefully close the connection on process termination
if (mongoose.connection.listeners("SIGINT").length === 0) {
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed due to app termination");
    process.exit(0);
  });
}
