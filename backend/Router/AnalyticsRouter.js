import express from 'express';
import { checkAuth } from '../Middleware/CheckAuth.js';
import { all } from '../Controller/AnalyticsController.js';

const AnalyticsRouter = express.Router();

AnalyticsRouter.use(checkAuth);

AnalyticsRouter.get('/all', all);

export default AnalyticsRouter;