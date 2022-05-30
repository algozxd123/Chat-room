import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import * as yup from 'yup';

const prisma = new PrismaClient();

export const create = async (req: Request, res: Response) => {
  const schema = yup.object().shape({
    text: yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) return res.status(400).json({ error: 'Validation error.' });
  const { text } = req.body;

  const user = await prisma.user.findFirst({ where: { id: req.body.jwtoken.id } });
  if (!user) return res.status(400).json({ error: 'User not found.' });

  const message = await prisma.message.create({
    data: {
      userId: user.id,
      text,
    },
  });

  return res.json({
    text: message.text,
    createdAt: message.createdAt,
    User: {
      name: user.name,
    },
  });
};

export const index = async (req: Request, res: Response) => {
  const messages = await prisma.message.findMany({
    select: {
      text: true,
      createdAt: true,
      User: {
        select: {
          name: true,
        },
      },
    },
  });

  return res.json(messages);
};
