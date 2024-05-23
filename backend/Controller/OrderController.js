import { paginateResult } from "../Helper/Paginate.js";
import OrderDetailModel from "../Model/OrderDetailModel.js";
import OrderModel from "../Model/OrderModel.js";
import ProductModel from "../Model/ProductModel.js"
import { errorJson, successJson } from "./Utilits/JsonRes.js";


export const store = async(req ,res)=>{
    const {orderData, orderDetailData} = req.body;
    const orderCode = generateCode();

    orderData.code = orderCode;
    orderData.status = 'packing';
    
    let totalPrice = 0;
    for(const orderDetail of orderDetailData){
        const product = await ProductModel.findById(orderDetail.product);
       
        totalPrice += product.price * orderDetail.qty;
    }
    orderData.subTotalPrice = totalPrice
    
    const orderResult = await OrderModel.create(orderData);

    const orderDetailsWithID = await Promise.all(orderDetailData.map((async (data)=>{
        const product = await ProductModel.findById(data.product);

        const totalPrice = product.price * data.qty;
        return {
            ...data,
            order_id: orderResult._id,
            price: totalPrice
        }
    }))
    )
    

    const orderDetailResult = await OrderDetailModel.create(orderDetailsWithID);

    res.json({orderResult, orderDetailResult});
}

export const getByID = async (req, res)=>{
    const id = req.params.id;
    const result = await OrderModel.findById(id);
    res.json(result);
}

export const getByUser = async (req, res)=>{
    const authUser = req.AuthUser;
    console.log(authUser);
    const result = await OrderModel.find({user: authUser._id});
    res.json(result);
}

export const updateOrderStatus = async(req, res)=>{
    const {status} = req.body;
    console.log(status);
    const id = req.params.id;
    const data = await OrderModel.findByIdAndUpdate(id, {status: status},{
        new: true
    });
    res.json(data);
}

export const all = async(req, res)=>{
    const{page, code} = req.query;
    const limit = 5;
    const sortField = "_id";
    const sortOrder = -1;

    const queryBuilder = [];
    if(code){
        queryBuilder.push({$text: {$search: code}});
    }

    const result = await paginateResult(OrderModel, page, limit, sortField, sortOrder, queryBuilder);

    res.json(result);
}

export const destroy = async(req, res)=>{
    const id = req.params.id;
   
    const order = await OrderModel.findById(id);
    if(order != null){
        await OrderModel.findByIdAndDelete(id);
        let orderDetail = await OrderDetailModel.find({order_id: id});
        if(orderDetail !=null){
            await OrderDetailModel.deleteMany({order_id: id});
        }
        else{
            return res.json(errorJson('fail', null));
        }
    }else{
        return res.json(errorJson('fail', null));
    }
    
    res.json(successJson('success', null));
}

const generateCode = ()=>{
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const orderCode = `ORD${randomNumber}`;
    return orderCode;
}