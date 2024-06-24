import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import connectDB from '@/lib/database';
import { getUserIDFromToken } from '@/lib/jwt';
import { notFoundMessage } from '@/lib/messageHandler';

import { IUser, UserJoi, UserModel } from '@/models/User';

// Get one or all users
export async function GET(req: NextRequest) {
  await connectDB();
  const userID = getUserIDFromToken();
  const user = await UserModel.findById(userID).lean();
  if (!user) {
    return NextResponse.json(notFoundMessage('User'));
  }
  return NextResponse.json(user);
}

// Update user including delete user by updating isDeleted to true
export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const data: Partial<IUser> = await req.json();
  const { error } = UserJoi.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
  if (!id) {
    throw new Error('Missing user ID');
  }
  await connectDB();
  const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!updatedUser) {
    return NextResponse.json(notFoundMessage('User'));
  }
  return NextResponse.json(updatedUser);
}
