import { jwtVerify, SignJWT } from 'jose';
import { headers } from 'next/headers';

export async function generateToken(userID: string) {
  const encodedSecret = new TextEncoder().encode(
    process.env.JWT_SECRET as string,
  );
  const token = await new SignJWT({ userID })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRE as string)
    .sign(encodedSecret);
  return token;
}

export function parseToken(token: string) {
  const encodedSecret = new TextEncoder().encode(
    process.env.JWT_SECRET as string,
  );
  const decoded = jwtVerify(token, encodedSecret);
  return decoded;
}

export function getUserIDFromToken() {
  const headersList = headers();
  return headersList.get('userID');
}
