import express from 'express';
import { checkAuth, checkAuthorize } from '../Middleware/CheckAuth.js';
import { all, getLastestReview, store } from '../Services/ReviewController.js';

const ReviewRouter = express.Router();
ReviewRouter.use(checkAuth);
ReviewRouter.post('/store', checkAuthorize('user'), store);
ReviewRouter.get('/all', checkAuthorize('admin'), all);
ReviewRouter.get('/getlatest', getLastestReview);

export default ReviewRouter;