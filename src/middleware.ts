import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { parseToken } from '@/lib/jwt';

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();

  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', '*');
  response.headers.set('Access-Control-Allow-Headers', '*');

  if (request.nextUrl.pathname.startsWith('/api/private')) {
    const token = request.headers.get('authorization');
    if (!token)
      return new NextResponse(
        JSON.stringify({ message: 'authentication failed' }),
        {
          status: 401,
          headers: response.headers,
        },
      );

    let userID: string;
    try {
      const { payload } = await parseToken(token);
      userID = payload.userID as string;
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: 'authentication failed' }),
        {
          status: 401,
          headers: response.headers,
        },
      );
    }
    response.headers.set('userID', userID);
  }

  return response;
};

export const config = {
  matcher: '/api/:path*',
};
