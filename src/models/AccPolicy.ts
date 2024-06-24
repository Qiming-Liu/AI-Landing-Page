import Joi from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IAccPolicy extends Document {
  accommodationId: string;
  isDogAllowed?: boolean;
  isCatAllowed?: boolean;
  isWormedRequired?: boolean;
  isDesexedRequired?: boolean;
  isVaccineRequired?: boolean;
  hasWashingmachine?: boolean;
  hasKitchen?: boolean;
  hasWifi?: boolean;
  isSmokeFree?: boolean;
  numOfCarpark: number;
}

export const AccPolicy = Joi.object({
  numOfCarpark: Joi.number().integer().min(0).required(),
});

const AccPolicySchema = new Schema(
  {
    accommodationId: { type: String, required: true },
    isDogAllowed: { type: Boolean, default: false },
    isCatAllowed: { type: Boolean, default: false },
    isWormedRequired: { type: Boolean, default: false },
    isDesexedRequired: { type: Boolean, default: false },
    isVaccineRequired: { type: Boolean, default: false },
    hasWashingmachine: { type: Boolean, default: false },
    hasKitchen: { type: Boolean, default: false },
    hasWifi: { type: Boolean, default: false },
    isSmokeFree: { type: Boolean, default: false },
    numOfCarpark: { type: Number, required: true },
  },
  { timestamps: true },
);

export const AccPolicyModel = mongoose.model('AccPolicy', AccPolicySchema);
