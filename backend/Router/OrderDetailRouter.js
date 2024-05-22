import express from 'express';
import { all, getByID, getByOrderID } from '../Controller/OrderDetailController.js';

const OrderDetailRouter = express();

OrderDetailRouter.get('/all', all);
OrderDetailRouter.get('/getbyId/:id', getByID);
OrderDetailRouter.get('/getbyOrderId/:id', getByOrderID);

export default OrderDetailRouter;