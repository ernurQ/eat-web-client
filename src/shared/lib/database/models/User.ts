import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  hashedPassword: { type: String, required: true },
});

export const User = models.User || model("User", UserSchema);
