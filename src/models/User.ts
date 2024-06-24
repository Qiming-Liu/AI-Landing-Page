import Joi from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  isDeleted: boolean;
}

export const UserJoi = Joi.object({
  username: Joi.string().min(4).max(10),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
  firstName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .min(1)
    .max(20),
  lastName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .min(1)
    .max(20),
  email: Joi.string().email(),
  isDeleted: Joi.boolean(),
});

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

export const UserModel =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
