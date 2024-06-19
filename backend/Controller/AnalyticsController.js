import ProductModel from '../Model/ProductModel.js';
import UserModel from '../Model/UserModel.js';
import OrderMoel from '../Model/OrderModel.js';

export const get_analytics = async(req, res) =>{
    const user = await UserModel.countDocuments({role : 'user'})
    const product = await ProductModel.countDocuments();
    const order = await OrderMoel.countDocuments();

    res.json({user, product, order});
}