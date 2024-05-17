import express from 'express';
import { login, logout, register } from '../Controller/AuthController.js';
import { checkAuth } from '../Middleware/CheckAuth.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', register);
AuthRouter.post('/login', login);
AuthRouter.post('/logout', logout);
AuthRouter.get('/checkAuth', checkAuth);

export default AuthRouter;