import express from 'express';
import { all, getByID } from '../Controller/OrderDetailController.js';

const OrderDetailRouter = express();

OrderDetailRouter.get('/all', all);
OrderDetailRouter.get('/getbyId/:id', getByID);

export default OrderDetailRouter;