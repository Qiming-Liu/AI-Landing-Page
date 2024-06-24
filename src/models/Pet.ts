import Joi from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IPet extends Document {
  _id: string;
  user_id: string;
  photo?: string;
  birthday?: Date;
  gender?: 'Unselected' | 'Male' | 'Female';
  description?: string;
  isDewormed: boolean;
  imageurl?: string;
  petType: string;
  name?: string;
  breed?: string;
  isDeleted: boolean;
}

export const PetJoi = Joi.object({
  user_id: Joi.string().required(),
  name: Joi.string().optional().allow(''),
  photo: Joi.string().optional().allow('').allow(null),
  breed: Joi.string().optional().allow(''),
  gender: Joi.string()
    .optional()
    .valid('Male', 'Female', 'Unselected')
    .allow(''),
  birthday: Joi.date().optional().allow('').allow(null),
  isDewormed: Joi.boolean().required(),
  description: Joi.string().optional().allow(''),
  imageurl: Joi.string().optional().allow(''),
  petType: Joi.string().valid('dog', 'cat', 'other').required(),
  isDeleted: Joi.boolean().required(),
});

export const PetIDJoi = Joi.object({
  user_id: Joi.string().required(),
  name: Joi.string().optional().allow(''),
  breed: Joi.string().optional().allow(''),
  photo: Joi.string().optional().allow('').allow(null),
  gender: Joi.string()
    .optional()
    .valid('Male', 'Female', 'Unselected')
    .allow(''),
  birthday: Joi.date().optional().allow('').allow(null),
  isDewormed: Joi.boolean().required(),
  description: Joi.string().optional().allow(''),
  imageurl: Joi.string().optional().allow(''),
  petType: Joi.string().valid('dog', 'cat', 'other').required(),
  isDeleted: Joi.boolean().required(),
});

export const PetUpdateJoi = Joi.object({
  _id: Joi.string().required(),
  user_id: Joi.string().required(),
  name: Joi.string().optional().allow(''),
  photo: Joi.string().optional().allow('').allow(null),
  breed: Joi.string().optional().allow(''),
  gender: Joi.string()
    .optional()
    .valid('Male', 'Female', 'Unselected')
    .allow(''),
  birthday: Joi.date().optional().allow('').allow(null),
  isDewormed: Joi.boolean().required(),
  description: Joi.string().optional().allow(''),
  imageurl: Joi.string().optional().allow(''),
  petType: Joi.string().valid('dog', 'cat', 'other').required(),
  isDeleted: Joi.boolean().required(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
  __v: Joi.number().optional(),
});

const PetSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    birthday: { type: Date, required: false },
    name: { type: String, required: false },
    photo: { type: String, required: false },
    breed: { type: String, required: false },
    gender: { type: String, required: false },
    description: { type: String, required: false },
    isDewormed: { type: Boolean, required: true, default: true },
    imageurl: { type: String, required: false },
    petType: { type: String, required: true, enum: ['dog', 'cat', 'other'] },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const PetModel = mongoose.models.Pet || mongoose.model<IPet>('Pet', PetSchema);

export { PetModel };
