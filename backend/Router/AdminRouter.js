import express from 'express';
import { checkAuth, checkAuthorize } from '../Middleware/CheckAuth.js';
import { createUser, getUserList } from '../Controller/AdminController.js';

const AdminRouter = express.Router();
AdminRouter.use(checkAuth);
AdminRouter.get('/users', checkAuthorize('admin'), getUserList);
AdminRouter.post('/create', checkAuthorize('admin'), createUser);

export default AdminRouter; 