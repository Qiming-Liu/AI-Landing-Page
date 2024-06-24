import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/database';
import { getUserIDFromToken } from '@/lib/jwt';

import {
  AccommodationJoi,
  AccommodationModel,
  IAccommodation,
} from '@/models/Accommodation';

export async function POST(req: NextRequest) {
  const data: Partial<IAccommodation> = await req.json();
  const userID = getUserIDFromToken();
  const accommodationData = {
    ...data,
    user_id: userID,
  };
  const { error } = AccommodationJoi.validate(accommodationData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  await connectDB();
  const newAccommodation = await AccommodationModel.create(accommodationData);

  return NextResponse.json(newAccommodation);
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    throw new Error('Missing Accommodation ID');
  }

  const Accommodation = await AccommodationModel.findById(id).lean();
  if (!Accommodation) {
    throw new Error('Accommodation not found');
  }

  await connectDB();
  await AccommodationModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: `Accommodation (id:${id} is deleted)` });
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    throw new Error('Missing Accommodation id');
  }
  const accommodation = (await AccommodationModel.findById(
    id,
  ).lean()) as IAccommodation;
  if (!accommodation) {
    throw new Error('Accommodation not found');
  }

  const data: Partial<IAccommodation> = await req.json();

  const keysToUpdate: (keyof Partial<IAccommodation>)[] = [
    'user_id',
    'propertyType',
    'weekdayPrice',
    'weekendPrice',
    'holidayPrice',
  ];

  const updateAccommodation: Partial<IAccommodation> = {};

  keysToUpdate.forEach((key) => {
    updateAccommodation[key] = data?.[key] || accommodation[key];
  });

  const { error } = AccommodationJoi.validate(updateAccommodation);
  if (error) {
    throw new Error(error.details[0].message);
  }

  await connectDB();
  await AccommodationModel.findByIdAndUpdate(id, updateAccommodation);
  return NextResponse.json({
    accommodation: updateAccommodation,
    msg: 'Accommodation updated',
  });
}
