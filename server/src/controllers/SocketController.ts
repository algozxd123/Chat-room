import * as jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';
import { JwtObject } from '@src/middleware/auth';
import * as MessageController from '@src/controllers/MessageController';

const JWT_TOKEN = process.env.TOKEN_SECRET ?? '';

const initialize = (io: Server, socket: Socket) => {
  if (
    socket.handshake.query &&
    socket.handshake.query.token &&
    (socket.handshake.query.token as string).split(' ').length === 2 &&
    /^Bearer$/i.test((socket.handshake.query.token as string).split(' ')[0]) &&
    (socket.handshake.query.token as string).split(' ')[1]
  ) {
    try {
      const decoded = jwt.verify((socket.handshake.query.token as string).split(' ')[1], JWT_TOKEN) as JwtObject;
      if (decoded.id) {
        socket.on('send_message', ({ text }) => {
          MessageController.create(io, socket, text, decoded.id);
        });
      }
    } catch (error: any) {
      console.log(error.name);
    }
  }
};

export default initialize;
