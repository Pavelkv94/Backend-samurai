import mongoose, { Schema, model } from "mongoose";

const mongoUri = process.env.MONGO_URI || "mongodb://0.0.0.0:27017";

const avatarSchema = new Schema({
  src: String,
  addedAt: { type: Date, default: Date.now },
});

const userSchema = new Schema({
  userName: { type: String, required: true },
  bio: { type: String, required: true },
  addedAt: { type: Date, required: false },
  avatars: { type: [avatarSchema], default: [] },
});

export const UserModel = model("users", userSchema);

export async function runDb() {
  try {
    mongoose.connect(mongoUri + "/" + "test");
    console.log("MongoDB connected!");
  } catch (error) {
    mongoose.disconnect();
    console.log(error);
  }
}
