import express from 'express';
import authMiddleware from '@src/middleware/auth';
import * as UserController from '@src/controllers/UserController';
import * as MessageController from '@src/controllers/MessageController';

const routes = express.Router();

routes.post('/api/register', UserController.register);
routes.get('/api/activateEmail/:userId/:activateToken', UserController.activateEmail);
routes.post('/api/login', UserController.login);

routes.use(authMiddleware);

routes.post('/api/message/create', MessageController.create);
routes.get('/api/message/', MessageController.index);

export default routes;
