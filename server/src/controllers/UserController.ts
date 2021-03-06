import { User } from '@prisma/client';
import { Request, Response } from 'express';
import * as yup from 'yup';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import mailer from '@src/libs/mailer';
import prisma from '@src/libs/prisma';

const TOKEN_EXPIRATION_TIME = (process.env.TOKEN_EXPIRATION_TIME as unknown as number) ?? 604800;
const JWT_TOKEN = process.env.TOKEN_SECRET ?? '';

export const sendNewConfirmationEmail = async (now: Date, user: User) => {
  const newActivateToken = crypto.randomBytes(20).toString('hex');
  const activateExpires = now;
  activateExpires.setHours(user.activateExpires.getHours() + 1);

  await prisma.user.update({
    where: { id: user.id },
    data: { activateToken: newActivateToken, activateExpires },
  });

  mailer.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Email verification:',
    html: `<p>To verify your account click the link: <a href="http://localhost:3001/api/activateEmail/${user.id}/${newActivateToken}">Verify email</a></p>`,
  });
};

export const register = async (req: Request, res: Response) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  if (!(await schema.isValid(req.body))) return res.status(400).json({ error: 'Validation error.' });
  const { name, email, password } = req.body;
  if (await prisma.user.findFirst({ where: { email } }))
    return res.status(400).json({ error: 'E-mail already registered.' });

  const activateToken = crypto.randomBytes(20).toString('hex');
  const activateExpires = new Date();
  activateExpires.setHours(activateExpires.getHours() + 1);

  const hash = bcrypt.hashSync(password, process.env.TOKEN_SECRET);
  const user = await prisma.user.create({
    data: {
      status: 'unverified',
      name,
      email,
      password: hash,
      activateToken,
      activateExpires,
    },
  });
  await mailer.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email verification:',
    html: `<p>To verify your account click the link: <a href="http://localhost:3001/api/activateEmail/${user.id}/${activateToken}">Verify email</a></p>`,
  });
  user.password = '';
  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + TOKEN_EXPIRATION_TIME);

  return res.json({
    username: user.name,
    email: user.email,
    token: jwt.sign({ id: user.id }, JWT_TOKEN, { expiresIn: TOKEN_EXPIRATION_TIME }),
    expiration: expirationDate.toISOString(),
  });
};

export const activateEmail = async (req: Request, res: Response) => {
  const schema = yup.object().shape({
    userId: yup.string().required(),
    activateToken: yup.string().required(),
  });

  if (!(await schema.isValid(req.params))) return res.status(400).json({ error: 'Validation error.' });
  const { userId, activateToken } = req.params;
  const user = await prisma.user.findFirst({ where: { id: userId } });

  if (!user) return res.status(400).json({ error: 'User not found.' });
  if (user.status !== 'unverified') return res.status(400).json({ error: 'The account is activated.' });
  if (activateToken !== user.activateToken) return res.status(400).json({ error: 'Token invalid.' });

  const now = new Date();
  if (now > new Date(user.activateExpires)) {
    await sendNewConfirmationEmail(now, user);
    return res.json({ message: 'New activation token was sent on the email.' });
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { status: 'active' },
  });

  updatedUser.password = '';

  return res.send({ message: 'Activation was a success' });
};

export const login = async (req: Request, res: Response) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  });

  if (!(await schema.isValid(req.body))) return res.status(400).json({ error: 'Validation error.' });
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ error: 'Login failed.' });

  if (user.status === 'unverified') {
    const now = new Date();
    if (now > new Date(user.activateExpires)) {
      await sendNewConfirmationEmail(now, user);
    }
    return res.json({ error: 'Email unverified.' });
  }
  user.password = '';
  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + TOKEN_EXPIRATION_TIME);
  return res.json({
    username: user.name,
    email: user.email,
    token: jwt.sign({ id: user.id }, JWT_TOKEN, { expiresIn: TOKEN_EXPIRATION_TIME }),
    expiration: expirationDate.toISOString(),
  });
};
