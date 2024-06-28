import express from 'express';
import { getFilterData } from '../Controller/DataController.js';

const DataRouter = express.Router();

DataRouter.get('/get-filter-data', getFilterData);

export default DataRouter;
