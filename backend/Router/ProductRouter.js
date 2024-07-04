import express from 'express';
import { getProductList, deleteProduct, editProduct, getProductById, createProduct, updateProduct } from '../Controller/ProductController.js';
import { checkAuth, checkAuthorize } from '../Middleware/CheckAuth.js';

const ProductRouter = express.Router();

ProductRouter.get('/all', getProductList);
ProductRouter.get('/:id', getProductById);

//Staff
ProductRouter.post('/store',checkAuth, createProduct);
ProductRouter.get("/edit/:id", checkAuth, editProduct);
ProductRouter.post('/update/:id', checkAuth, updateProduct);
ProductRouter.post('/destroy/:id', checkAuth, deleteProduct);



export default ProductRouter;