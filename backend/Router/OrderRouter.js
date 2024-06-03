import express from 'express';
import { getOrderList, destroy, getOrderByID, getOrderByUser, create_Order, updateOrderStatus } from '../Controller/OrderController.js';
import { checkAuth, checkAuthorize } from '../Middleware/CheckAuth.js';

const OrderRouter = express.Router();

OrderRouter.post('/store',create_Order);
OrderRouter.get('/getbyId/:id', getOrderByID);
OrderRouter.get('/getbyUser/:id', getOrderByUser);
OrderRouter.get('/all', getOrderList);
OrderRouter.post('/updateStatus/:id', checkAuth, checkAuthorize('admin'), updateOrderStatus)
OrderRouter.post('/destroy/:id', checkAuth, checkAuthorize('user'), destroy);


export default OrderRouter;