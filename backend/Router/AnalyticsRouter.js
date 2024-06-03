import express from 'express';
import { checkAuth } from '../Middleware/CheckAuth.js';
import { get_analytics } from '../Controller/AnalyticsController.js';

const AnalyticsRouter = express.Router();

AnalyticsRouter.use(checkAuth);

AnalyticsRouter.get('/all', get_analytics);

export default AnalyticsRouter;