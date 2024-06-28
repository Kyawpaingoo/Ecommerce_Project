import express from 'express';
import {AuthService} from '../Services/AuthServices/AuthService';
import { IRepository } from '../Repository/IRepository';
import UserModel, { IUser } from '../Model/UserModel';
import { Repository } from '../Repository/Repository';

const AuthRouter = express.Router();
const repository: IRepository<IUser> = new Repository<IUser>(UserModel);
const authServiceInstance = new AuthService(repository);

AuthRouter.post('/register', authServiceInstance.register);
// AuthRouter.post('/login', login);
// AuthRouter.post('/logout', logout);
// AuthRouter.get('/checkAuth', checkAuth);

export default AuthRouter;