import express from 'express';
import { checkAuth, checkAuthorize } from '../Middleware/CheckAuth.js';
import { all, store } from '../Controller/ContactController.js';

const ContactRouter = express.Router();
ContactRouter.post('/store',store);
ContactRouter.get('/all', checkAuth, checkAuthorize('admin'), all);

export default ContactRouter;