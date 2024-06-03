import express from 'express';
import { all, getOrderDetailByID, getByOrderID } from '../Controller/OrderDetailController.js';

const OrderDetailRouter = express();

OrderDetailRouter.get('/all', all);
OrderDetailRouter.get('/getbyId/:id', getOrderDetailByID);
OrderDetailRouter.get('/getbyOrderId/:id', getByOrderID);

export default OrderDetailRouter;