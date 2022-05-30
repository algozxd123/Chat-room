import dotenv from 'dotenv-safe';
import * as jwt from 'jsonwebtoken';
import express from 'express';

dotenv.config();

// the object definition of JwtPayload and the actual return value of jwt.verify are different, creating conflict with typescript
export type JwtObject = {
  id: string;
  iat: number;
  exp: number;
};

const JWT_TOKEN = process.env.TOKEN_SECRET ?? '';

const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'No token provided.' });
  if (!(authHeader.split(' ').length === 2)) return res.status(401).json({ message: 'Token malformatted.' });
  const [scheme, token] = authHeader.split(' ');
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: 'Token malformatted.' });
  const decoded = jwt.verify(token, JWT_TOKEN) as JwtObject;
  req.body.jwtoken = decoded;
  return next();
};

export default authMiddleware;
