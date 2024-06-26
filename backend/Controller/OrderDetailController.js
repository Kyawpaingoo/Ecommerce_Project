import { paginateResult } from "../Helper/Paginate.js";
import OrderDetailModel from "../Model/OrderDetailModel.js";

export const all = async(req, res)=>{
    const {page} = req.query;
    const limit = 5;
    const sortField = "_id";
    const sortOrder = -1;

    const queryBuilder = [];
    
    const result = await paginateResult(OrderDetailModel, page, limit, sortField, sortOrder, queryBuilder);

    res.json(result);
}

export const getOrderDetailByID = async(req, res)=>{
    const id = req.params.id;
    const result = await OrderDetailModel.findById(id);
    res.json(result);
}

export const getByOrderID = async(req, res)=>{
    const id= req.params.id;
    const result = await OrderDetailModel.find({order_id: id}).populate('product');
    res.json(result);
}