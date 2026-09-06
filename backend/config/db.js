import mongoose from "mongoose";

// Cache connection across serverless invocations on Vercel
let cached = global._mongooseConn;
if (!cached) {
    cached = global._mongooseConn = { conn: null, promise: null };
}

export const connectDB = async () => {
    // Return existing live connection
    if (cached.conn && mongoose.connection.readyState === 1) {
        return cached.conn;
    }

    if (!cached.promise) {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error(
                "MONGO_URI is not defined. Add it to Vercel Environment Variables."
            );
        }

        cached.promise = mongoose
            .connect(uri, {
                serverSelectionTimeoutMS: 10000,
                bufferCommands: false,
            })
            .then((m) => {
                console.log("DB CONNECTED");
                return m;
            })
            .catch((err) => {
                cached.promise = null; // allow retry on next request
                throw err;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};
