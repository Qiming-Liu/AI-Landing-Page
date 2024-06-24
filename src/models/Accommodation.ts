import Joi from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IAccommodation extends Document {
  _id: string;
  user_id: string;
  fullName: string;
  address: string;
  weekdayPrice: number;
  weekendPrice: number;
  holidayPrice: number;
  bedroom: number;
  bathroom: number;
  parking: number;
  toilet: number;
  dog: number;
  cat: number;
  totalPets: number;
  propertyType: string;
  amenities: string[];
  description: string;
  images: string[];
  avgRating: number;
  isDeleted: boolean;
}

export const AccommodationJoi = Joi.object({
  _id: Joi.string(),
  user_id: Joi.string().required(),
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  weekdayPrice: Joi.number().required(),
  weekendPrice: Joi.number().required(),
  holidayPrice: Joi.number().required(),
  bedroom: Joi.number().required(),
  bathroom: Joi.number().required(),
  parking: Joi.number().required(),
  toilet: Joi.number().required(),
  dog: Joi.number().required(),
  cat: Joi.number().required(),
  totalPets: Joi.number().required(),
  propertyType: Joi.string().required(),
  amenities: Joi.array().items(Joi.string()).required(),
  description: Joi.string().required(),
  images: Joi.array().items(Joi.string()).required(),
  avgRating: Joi.number(),
  isDeleted: Joi.boolean(),
});

const AccommodationSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    weekdayPrice: { type: Number, required: true },
    weekendPrice: { type: Number, required: true },
    holidayPrice: { type: Number, required: true },
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    parking: { type: Number, required: true },
    toilet: { type: Number, required: true },
    dog: { type: Number, required: true },
    cat: { type: Number, required: true },
    totalPets: { type: Number, required: true },
    propertyType: { type: String, required: true },
    amenities: { type: [String], required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    avgRating: { type: Number },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

export const AccommodationModel =
  mongoose.models.Accommodation ||
  mongoose.model<IAccommodation>('Accommodation', AccommodationSchema);
