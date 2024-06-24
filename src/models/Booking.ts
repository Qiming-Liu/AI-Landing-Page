import Joi from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  _id: string;
  pet_user_id: string;
  accomodation_user_id: string;
  accommodation_id: string;
  pet_id?: string;
  description?: string;
  isPending: boolean;
  isAccepted: boolean;
  isRejected: boolean;
  isValid: boolean;
}

export const BookingJoi = Joi.object({
  _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  user_id: Joi.string().required(),
  accomodation_user_id: Joi.string().required(),
  accommodation_id: Joi.string().required(),
  pet_id: Joi.string(),
  description: Joi.string().optional(),
  isPending: Joi.boolean().required(),
  isAccepted: Joi.boolean().required(),
  isRejected: Joi.boolean().required(),
  isValid: Joi.boolean().required(),
});

export const BookingIDJoi = Joi.object({
  _id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

export const BookingSchema = new Schema(
  {
    user_id: { type: String, required: true },
    accomodation_user_id: { type: String, required: true },
    accommodation_id: { type: String, required: true },
    pet_id: { type: String, required: false },
    description: { type: String, required: false },
    isPending: { type: Boolean, required: true, default: true },
    isAccepted: { type: Boolean, required: true, default: false },
    isRejected: { type: Boolean, required: true, default: false },
    isValid: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

export const BookingModel = mongoose.model('Booking', BookingSchema);
