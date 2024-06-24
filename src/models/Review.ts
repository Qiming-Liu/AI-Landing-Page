import Joi from 'joi';
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IReview extends Document {
  user_id: string;
  accommodation_id: string;
  description: string;
  stars: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  thumbup: number;
  thumbdown: number;
  title: string;
}

export const ReviewJoi = Joi.object({
  user_id: Joi.string().required(),
  stars: Joi.number().min(1).max(5).required(),
  description: Joi.string().allow(''),
  thumbup: Joi.number(),
  thumbdown: Joi.number(),
  title: Joi.string().allow(''),
});

export const ReviewIDJoi = Joi.object({
  user_id: Joi.string().required(),
  stars: Joi.number().min(1).max(5),
  description: Joi.string().allow(''),
  thumbup: Joi.number(),
  thumbdown: Joi.number(),
  title: Joi.string().allow(''),
});

const ReviewSchema = new Schema(
  {
    user_id: { type: String, required: true },
    // accommodation_id: { type: String, required: true },
    description: { type: String, required: true },
    stars: { type: Number, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
    createdAt: { type: String, required: false },
    updatedAt: { type: String, required: false },
    thumbup: { type: Number, default: 0 },
    thumbdown: { type: Number, default: 0 },
    title: { type: String, required: true },
  },
  { timestamps: true },
);
export const ReviewModel: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
