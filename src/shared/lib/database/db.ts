import mongoose from "mongoose";

const MONGO_URI = 'mongodb+srv://azatabdirashituly:20feb2005@cluster0.sellypx.mongodb.net/';

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

// Use a global cache so we don’t re-init on hot reload
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, { dbName: "eatweb" })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
