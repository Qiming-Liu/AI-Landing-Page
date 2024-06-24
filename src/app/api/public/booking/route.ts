import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/database';
import { deletedMessage, notFoundMessage } from '@/lib/messageHandler';

import {
  BookingIDJoi,
  BookingJoi,
  BookingModel,
  IBooking,
} from '@/models/Booking';

export async function GET(req: NextRequest) {
  await connectDB();
  const id = req.nextUrl.searchParams.get('id');
  if (id) {
    const booking = await BookingModel.findById(id).lean();
    if (!booking) {
      return NextResponse.json(notFoundMessage('Booking'));
    }
  } else {
    const allBookings = await BookingModel.find().lean();
    return NextResponse.json(allBookings);
  }
}

export async function POST(req: NextRequest) {
  const data: Partial<IBooking> = await req.json();
  const { error } = BookingJoi.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
  await connectDB();
  const newBooking = await BookingModel.create(data);
  return NextResponse.json(newBooking);
}

export async function DELETE(req: NextRequest) {
  const data: Partial<IBooking> = await req.json();
  const { error } = BookingIDJoi.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
  if (!data._id) {
    throw new Error('Missing Booking ID');
  }
  await connectDB();
  await BookingModel.findByIdAndDelete(data._id);
  return NextResponse.json(notFoundMessage('Booking'));
}

export async function PUT(req: NextRequest) {
  const data: Partial<IBooking> = await req.json();
  const { error } = BookingJoi.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
  if (!data._id) {
    throw new Error('Missing Booking ID');
  }
  await connectDB();
  const deleteBooking = BookingModel.findByIdAndUpdate(data._id, data);
  if (!deleteBooking) {
    return NextResponse.json(notFoundMessage('booking'));
  }
  return NextResponse.json(deletedMessage('booking'));
}
