import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Server } from 'socket.io';
import { createServer } from 'http';
import dotenv from 'dotenv';
import prisma from '@src/libs/prisma';
import routes from '@src/routes';
import initialize from '@src/controllers/SocketController';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  initialize(io, socket);
});

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(routes);

export { app, server, prisma };
