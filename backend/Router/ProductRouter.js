import express from 'express';
import { all, destroy, edit, getById, store, update } from '../Controller/ProductController.js';
import { checkAuth, checkAuthorize } from '../Middleware/CheckAuth.js';

const ProductRouter = express.Router();

ProductRouter.get('/all', all);
ProductRouter.get('/:id', getById);

//Staff
ProductRouter.post('/store',checkAuth, checkAuthorize('staff'), store);
ProductRouter.get("/edit/:id", checkAuth, checkAuthorize('staff'), edit);
ProductRouter.post('/update/:id', checkAuth, checkAuthorize('staff'), update);
ProductRouter.post('/destroy/:id', checkAuth, checkAuthorize('admin'), destroy);



export default ProductRouter;