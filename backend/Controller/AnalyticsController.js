import ProductModel from '../Model/ProductModel.js';
import UserModel from '../Model/UserModel.js';
import OrderMoel from '../Model/OrderModel.js';

export const all = async(req, res) =>{
    const user = await UserModel.find({role : 'user'})
    const product = await ProductModel.find();
    const order = await OrderMoel.find();

    res.json({user, product, order});
}