import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/database';
import { notFoundMessage } from '@/lib/messageHandler';

import { ReviewModel } from '@/models/Review';

export async function GET(req: NextRequest) {
  await connectDB();
  const id = req.nextUrl.searchParams.get('id');
  if (id) {
    const review = await ReviewModel.findById(id).lean();

    if (!review || review.isDeleted) {
      return NextResponse.json(notFoundMessage('Review'));
    }
    return NextResponse.json(review);
  } else {
    const reviews = await ReviewModel.find({ isDeleted: false }).lean();
    return NextResponse.json(reviews);
  }
}
