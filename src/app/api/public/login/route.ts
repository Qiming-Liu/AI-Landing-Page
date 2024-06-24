import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/database';
import { generateToken } from '@/lib/jwt';

import { UserModel } from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { username, password } = await req.json();
    const UserDoc = await UserModel.findOne({ username });
    if (UserDoc) {
      const passOk = bcrypt.compareSync(password, UserDoc.password);
      if (passOk) {
        const token = await generateToken(UserDoc._id);
        return NextResponse.json({
          status: 200,
          token: token,
          name: UserDoc.username,
          message: 'Login successful',
        });
      } else {
        return NextResponse.json({
          status: 422,
          message: 'Your password is incorrect, please try again',
        });
      }
    } else {
      return NextResponse.json({
        status: 404,
        message: 'User does not exist',
      });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: error });
  }
}
