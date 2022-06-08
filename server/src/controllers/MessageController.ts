import { Request, Response } from 'express';
import { Server, Socket } from 'socket.io';
import prisma from '@src/libs/prisma';

export const create = async (io: Server, socket: Socket, text: string, userId: string) => {
  const user = await prisma.user.findFirst({ where: { id: userId } });

  if (!user) return socket.emit('message_sent', { error: 'User not found' });

  const message = await prisma.message.create({
    data: {
      userId: user.id,
      text,
    },
  });

  return io.emit('message_sent', {
    text: message.text,
    createdAt: message.createdAt,
    id: message.id,
    User: {
      name: user.name,
    },
  });
};

export const index = async (req: Request, res: Response) => {
  const messages = await prisma.message.findMany({
    select: {
      id: true,
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
