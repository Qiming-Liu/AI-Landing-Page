import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/database';
import { generateToken } from '@/lib/jwt';
import { hashPassword } from '@/lib/utils';

import { IUser, UserJoi, UserModel } from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data: Partial<IUser> = await req.json();
    const { error } = UserJoi.validate(data);
    if (error) {
      return NextResponse.json({
        status: 400,
        message: error.details[0].message,
      });
    }

    const oldUser = await UserModel.findOne({ username: data.username }).exec();
    if (oldUser) {
      return NextResponse.json({
        status: 409,
        message: 'User already registered',
      });
    }

    const { username, password, firstName, lastName, email } = data;
    const hashedPassword = hashPassword(password!);
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
    });
    const userId = newUser._id;
    if (userId) {
      const token = await generateToken(userId);
      return NextResponse.json({
        status: 200,
        message: 'User created successfully',
        user: newUser,
        token: token,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}
