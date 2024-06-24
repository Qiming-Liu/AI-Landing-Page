import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/database';
import { parseToken } from '@/lib/jwt';
import { generateToken } from '@/lib/jwt';
import { hashPassword } from '@/lib/utils';

import { UserModel } from '@/models/User';

interface MyRequestBody {
  token: string;
  oldPassword: string;
  newPassword: string;
}
export async function POST(req: NextRequest) {
  const { token, oldPassword, newPassword } =
    req.body as unknown as MyRequestBody;
  try {
    await connectDB();

    const { payload } = await parseToken(token);
    if (!payload) {
      return NextResponse.json({
        status: 401,
        message: 'Unauthorized',
      });
    }

    const userId = payload.userID;
    const user = await UserModel.findById(userId);

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: 'User not found',
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({
        status: 401,
        message: 'Old password is incorrect',
      });
    }
    user.password = hashPassword(newPassword);
    await user.save();
    const newToken = await generateToken(user._id.toString());
    return NextResponse.json({
      status: 200,
      message: 'Password updated successfully',
      token: newToken,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: 'Internal server error',
    });
  }
}
