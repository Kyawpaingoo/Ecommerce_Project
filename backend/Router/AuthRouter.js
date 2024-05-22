import express from 'express';
import { login, logout, register, checkAuth } from '../Controller/AuthController.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', register);
AuthRouter.post('/login', login);
AuthRouter.post('/logout', logout);
AuthRouter.get('/checkAuth', checkAuth);

export default AuthRouter;