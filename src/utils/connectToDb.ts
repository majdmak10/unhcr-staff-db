import mongoose from "mongoose";

// Mongo URI will be resolved when a connection is attempted. This prevents
// Next.js from throwing during the build phase when environment variables may
// not yet be available. The check is performed inside `connectToDb` instead of
// at module load time.
let MONGO_URI: string | undefined;

// Maintain a connection status to prevent multiple connections
let isConnected = false;

// Function to connect to MongoDB
export const connectToDb = async (): Promise<typeof mongoose> => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return mongoose;
  }

  try {
    // Resolve the connection string when a connection is first attempted
    if (!MONGO_URI) {
      MONGO_URI = process.env.MONGODB_URI;
    }
    if (!MONGO_URI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

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
