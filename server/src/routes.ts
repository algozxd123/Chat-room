import express from 'express';
import authMiddleware from '@src/middleware/auth';
import * as UserController from '@src/controllers/UserController';

const routes = express.Router();

routes.post('/api/register', UserController.register);
routes.get('/api/activateEmail/:userId/:activateToken', UserController.activateEmail);
routes.post('/api/login', UserController.login);

routes.use(authMiddleware);

export default routes;
