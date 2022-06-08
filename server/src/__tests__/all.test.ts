import supertest from 'supertest';
import { PrismaClient } from '@prisma/client';
import { io, Socket } from 'socket.io-client';
import { server } from '@src/server';

const prisma = new PrismaClient();
let socket: Socket;

type Message = {
  text: string;
  createdAt: string;
  id: string;
  User: {
    name: string;
  };
};

const userData = {
  name: 'new user',
  email: 'algozxdplays@gmail.com',
  password: '123456789',
  token: '',
};

describe('register', () => {
  it('no name provided', async () => {
    const body = {
      name: userData.name,
      password: userData.password,
    };
    const response = await supertest(server).post('/api/register').send(body).set('Content-Type', 'application/json');
    expect(response.body.error).toBe('Validation error.');
  });

  it('no email provided', async () => {
    const body = {
      name: userData.name,
      password: userData.password,
    };
    const response = await supertest(server).post('/api/register').send(body).set('Content-Type', 'application/json');
    expect(response.body.error).toBe('Validation error.');
  });

  it('no password provided', async () => {
    const body = {
      email: userData.email,
      name: userData.name,
    };
    const response = await await supertest(server)
      .post('/api/register')
      .send(body)
      .set('Content-Type', 'application/json');
    expect(response.body.error).toBe('Validation error.');
  });

  it('successful request', async () => {
    const response = await supertest(server)
      .post('/api/register')
      .send(userData)
      .set('Content-Type', 'application/json');
    expect(response.body.username).toBe(userData.name);
    expect(response.body.email).toBe(userData.email);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('expiration');
  });

  it('email already exists', async () => {
    const response = await supertest(server)
      .post('/api/register')
      .send(userData)
      .set('Content-Type', 'application/json');
    expect(response.body.error).toBe('E-mail already registered.');
  });
});

describe('login', () => {
  it('no email provided', async () => {
    const body = {
      password: userData.password,
    };
    const response = await supertest(server).post('/api/login').send(body).set('Content-Type', 'application/json');
    expect(response.body.error).toBe('Validation error.');
  });

  it('no password provided', async () => {
    const body = {
      email: userData.email,
    };
    const response = await supertest(server).post('/api/login').send(body).set('Content-Type', 'application/json');
    expect(response.body.error).toBe('Validation error.');
  });

  it('wrong email', async () => {
    const body = {
      email: 'algozxdplays2@gmail.com',
      password: '123456789',
    };
    const response = await supertest(server).post('/api/login').send(body).set('Content-Type', 'application/json');
    expect(response.body.error).toBe('Login failed.');
  });

  it('wrong password', async () => {
    const body = {
      email: 'algozxdplays@gmail.com',
      password: '1234567891',
    };
    const response = await supertest(server).post('/api/login').send(body).set('Content-Type', 'application/json');
    expect(response.body.error).toBe('Login failed.');
  });

  it('email not verified', async () => {
    const response = await supertest(server).post('/api/login').send(userData).set('Content-Type', 'application/json');
    expect(response.body.error).toBe('Email unverified.');
  });

  it('verify email', async () => {
    const user = await prisma.user.findFirst({ where: { email: userData.email } });

    expect(user).toBeDefined();
    if (user === null) return;
    const response = await supertest(server).get(`/api/activateEmail/${user.id}/${user.activateToken}`);
    expect(response.body.message).toBe('Activation was a success');
  });

  it('successful request', async () => {
    const body = {
      email: userData.email,
      password: userData.password,
    };

    const response = await supertest(server).post('/api/login').send(body).set('Content-Type', 'application/json');
    expect(response.body.username).toBe(userData.name);
    expect(response.body.email).toBe(body.email);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('expiration');
    userData.token = response.body.token;
  });

  it('authenticated route without token', async () => {
    const response = await supertest(server).get('/api/message/').set('Content-Type', 'application/json');

    expect(response.body.error).toBe('No token provided.');
  });

  it('authenticated route with token malformatted (without space)', async () => {
    const response = await supertest(server)
      .get('/api/message/')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer${userData.token}`);

    expect(response.body.error).toBe('Token malformatted.');
  });

  it('authenticated route with token malformatted (wrong token)', async () => {
    const response = await supertest(server)
      .get('/api/message/')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${userData.token}5`);

    expect(response.body.error).toBe('Token malformatted.');
  });
});

describe('message', () => {
  beforeAll(() => {
    server.listen(process.env.PORT);

    socket = io('ws://localhost:3001', {
      query: {
        token: `Bearer ${userData.token}`,
      },
    });
  });

  afterAll(() => {
    server.close();
  });

  it('get all messages (empty db)', async () => {
    const response = await supertest(server)
      .get('/api/message/')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${userData.token}`);

    expect(response.body).toStrictEqual([]);
  });

  it('testing socket connections', (done) => {
    const messageText = 'new message';

    socket.on('message_sent', (data: Message) => {
      expect(data.text).toBe(messageText);
      expect(data).toHaveProperty('createdAt');
      expect(data).toHaveProperty('User');
      expect(data).toHaveProperty('id');
      expect(data.User.name).toBe(userData.name);
      done();
    });

    socket.emit('send_message', { text: messageText });
  });
});

afterAll(async () => {
  socket.close();
  await prisma.message.deleteMany({ where: {} });
  await prisma.user.deleteMany({ where: {} });
  await prisma.$disconnect();
});
