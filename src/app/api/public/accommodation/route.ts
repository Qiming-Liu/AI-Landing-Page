import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/database';

import { AccommodationModel } from '@/models/Accommodation';

interface AccommodationQuery {
  weekdayPrice?: {
    $gte?: number;
    $lte?: number;
  };
  bedroom?: { $gte: number };
  bathroom?: { $gte: number };
  parking?: { $gte: number };
  toilet?: { $gte: number };
  cat?: {
    $gte: number;
  };
  dog?: {
    $gte: number;
  };
  propertyType?: string;
  amenities?: { $all: string[] };
}

export async function GET(req: NextRequest) {
  await connectDB();
  const minPrice = req.nextUrl.searchParams.get('minPrice');
  const maxPrice = req.nextUrl.searchParams.get('maxPrice');
  const bedroom = req.nextUrl.searchParams.get('bedroom');
  const bathroom = req.nextUrl.searchParams.get('bathroom');
  const parking = req.nextUrl.searchParams.get('parking');
  const toilet = req.nextUrl.searchParams.get('toilet');
  const catsAllowed = req.nextUrl.searchParams.get('catsAllowed');
  const dogsAllowed = req.nextUrl.searchParams.get('dogsAllowed');
  const selectedType = req.nextUrl.searchParams.get('selectedType');
  const amenities = req.nextUrl.searchParams.get('amenities');
  const id = req.nextUrl.searchParams.get('id');

  const query: AccommodationQuery = {};
  if (minPrice) {
    query.weekdayPrice = { $gte: parseInt(minPrice as string) };
  }
  if (maxPrice) {
    query.weekdayPrice = {
      ...query.weekdayPrice,
      $lte: parseInt(maxPrice as string),
    };
  }
  if (bedroom) {
    query.bedroom = { $gte: parseInt(bedroom as string) };
  }
  if (bathroom) {
    query.bathroom = { $gte: parseInt(bathroom as string) };
  }
  if (parking) {
    query.parking = { $gte: parseInt(parking as string) };
  }
  if (toilet) {
    query.toilet = { $gte: parseInt(toilet as string) };
  }
  if (catsAllowed !== null && catsAllowed !== undefined) {
    query.cat = { $gte: parseInt(catsAllowed as string) };
  }
  if (dogsAllowed !== null && dogsAllowed !== undefined) {
    query.dog = { $gte: parseInt(dogsAllowed as string) };
  }
  if (selectedType) {
    query.propertyType = selectedType as string;
  }
  if (amenities) {
    query.amenities = { $all: amenities.split(',').map((a) => a.trim()) };
  }
  const hasOtherFilters = Object.keys(query).length > 0;
  if (hasOtherFilters) {
    const filteredAccommodations = await AccommodationModel.find(query).lean();
    if (!filteredAccommodations) {
      return NextResponse.json({ msg: 'No accommodations found' });
    }
    return NextResponse.json(filteredAccommodations);
  }
  if (id) {
    const Accommodation = await AccommodationModel.findById(id).lean();
    if (!Accommodation) {
      return NextResponse.json({ msg: 'Accommodation not found' });
    }
    return NextResponse.json(Accommodation);
  } else {
    const allAccommodations = await AccommodationModel.find().lean();
    return NextResponse.json(allAccommodations);
  }
}
