import express from 'express';
import { all, destroy, getByID, getByUser, store, updateOrderStatus } from '../Controller/OrderController.js';
import { checkAuth, checkAuthorize } from '../Middleware/CheckAuth.js';

const OrderRouter = express.Router();

OrderRouter.post('/store', checkAuth, checkAuthorize('user'), store);
OrderRouter.get('/getbyId/:id', getByID);
OrderRouter.get('/getbyUser', checkAuth, checkAuthorize('user'), getByUser);
OrderRouter.get('/all', all);
OrderRouter.post('/updateStatus/:id', checkAuth, checkAuthorize('admin'), updateOrderStatus)
OrderRouter.post('/destroy/:id', checkAuth, checkAuthorize('user'), destroy);


export default OrderRouter;