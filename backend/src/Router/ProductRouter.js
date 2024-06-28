import express from 'express';
import { getProductList, deleteProduct, editProduct, getProductById, createProduct, updateProduct } from '../Controller/ProductController.js';
import { checkAuth, checkAuthorize } from '../Middleware/CheckAuth.js';

const ProductRouter = express.Router();

ProductRouter.get('/all', getProductList);
ProductRouter.get('/:id', getProductById);

//Staff
ProductRouter.post('/store',checkAuth, checkAuthorize('staff'), createProduct);
ProductRouter.get("/edit/:id", checkAuth, checkAuthorize('staff'), editProduct);
ProductRouter.post('/update/:id', checkAuth, checkAuthorize('staff'), updateProduct);
ProductRouter.post('/destroy/:id', checkAuth, checkAuthorize('staff'), deleteProduct);



export default ProductRouter;