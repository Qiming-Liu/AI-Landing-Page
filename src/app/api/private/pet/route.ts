import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/database';
import { getUserIDFromToken } from '@/lib/jwt';

import { IPet, PetJoi, PetModel, PetUpdateJoi } from '@/models/Pet';

export async function GET() {
  try {
    await connectDB();
    const userID = getUserIDFromToken();

    try {
      const pets = await PetModel.find({
        user_id: userID,
        isDeleted: false,
      }).lean();
      return NextResponse.json(pets, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: Partial<IPet> = await req.json();

    const userID = getUserIDFromToken();

    const petData = {
      ...data,
      user_id: userID,
      isDeleted: false,
    };

    const { error } = PetJoi.validate(petData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    await connectDB();

    const newPet = await PetModel.create(petData);

    return NextResponse.json(newPet, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const userID = getUserIDFromToken();
  const data = await req.json();

  try {
    if (Array.isArray(data.ids)) {
      const { ids, isDeleted } = data;
      const result = await PetModel.updateMany(
        { _id: { $in: ids }, user_id: userID },
        { $set: { isDeleted: isDeleted } },
      );
      return new Response(JSON.stringify({ updatedCount: result }), {
        status: 200,
      });
    }

    if (data._id) {
      const updateData = { ...data, user_id: userID };
      const { error } = PetUpdateJoi.validate(updateData);
      if (error) throw new Error(error.details[0].message);

      const updatedPet = await PetModel.findByIdAndUpdate(
        data._id,
        updateData,
        { new: true },
      );
      if (!updatedPet) throw new Error('Pet not found');

      return NextResponse.json({ update: { updatedPet } }, { status: 200 });
    }

    throw new Error('Invalid request data');
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
