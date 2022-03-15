import authConfig from '@config/auth';
import AppError from '@shared/http/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }
  //Bearer
  const [, token] = authHeader.split(' ');
  try {
    const decodeToken = verify(token, authConfig.jwt.secret);
    const { sub } = decodeToken as ITokenPayload;

    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}
