import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/database';
import { getUserIDFromToken } from '@/lib/jwt';
import { deletedMessage, notFoundMessage } from '@/lib/messageHandler';

import { IReview, ReviewIDJoi, ReviewJoi, ReviewModel } from '@/models/Review';

export async function POST(req: NextRequest) {
  const data: Partial<IReview> = await req.json();
  const userID = getUserIDFromToken();
  const reviewData = {
    ...data,
    user_id: userID,
  };

  const { error } = ReviewJoi.validate(reviewData);
  if (error) {
    throw new Error(error.details[0].message);
  }
  await connectDB();
  const newReview = await ReviewModel.create(reviewData);

  return NextResponse.json(newReview);
}

export async function PUT(req: NextRequest) {
  const data: Partial<IReview> = await req.json();
  const { error } = ReviewIDJoi.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
  if (!data._id) {
    throw new Error('Missing review ID');
  }
  await connectDB();
  const updatedReview = await ReviewModel.findByIdAndUpdate(data._id, data, {
    new: true,
  });
  if (!updatedReview) {
    return NextResponse.json(notFoundMessage('Review'));
  }
  return NextResponse.json(updatedReview);
}

export async function DELETE(req: NextRequest) {
  const data: Partial<IReview> = await req.json();
  const { error } = ReviewIDJoi.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
  if (!data._id) {
    throw new Error('Missing review ID');
  }
  await connectDB();
  const deleteReview = await ReviewModel.findByIdAndDelete(data._id);
  if (!deleteReview) {
    return NextResponse.json(notFoundMessage('Review'));
  }
  return NextResponse.json(deletedMessage('Review'));
}
