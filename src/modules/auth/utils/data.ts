import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch {
    throw new UnauthorizedException(`Comparing ${password} failed`);
  }
}

export function setCookieForToken(refreshToken: string, res: Response) {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: 'auth/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}
