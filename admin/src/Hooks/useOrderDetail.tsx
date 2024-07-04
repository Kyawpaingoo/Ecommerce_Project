import React, { useEffect, useState } from 'react'
import { IOrder, IOrderDetail } from '../Interface/IOrder'
import axios from 'axios';

const useOrderDetail = (id: string | undefined) => {
    const [orderDetail, setOrderDetail] = useState<IOrderDetail[] | null>([]);
    const [orderData, setOrderData] = useState<IOrder | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [subtotalPrice, setSubTotalPrice] = useState<number>(0);
    const shippingFees = 10;
    const tax = 5;
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const orderDetailRequest = await axios.get<IOrderDetail[]>(`/orderDetail/getbyOrderId/${id}`);
                const orderRequest = await axios.get<IOrder>(`/order/getbyId/${id}`);
                const [orderDetailResponse, orderResponse] = await Promise.all([orderDetailRequest, orderRequest]);
                setOrderData(orderResponse.data);
                setOrderDetail(orderDetailResponse.data);
                const subTotal = orderDetailResponse.data.length >= 2 ? orderDetailResponse.data.reduce((sum, item)=> sum + item.price  * item.qty, 0) : orderDetailResponse.data[0].price;
                setSubTotalPrice(subTotal);
                const total = subTotal + tax + shippingFees;
                setTotalPrice(total);
            }
            catch(error){
                console.error('Error fetching data', error)
            }
        }
        fetchData();
    },[id])

  return {orderData, orderDetail, subtotalPrice, totalPrice, shippingFees, tax}
}

export default useOrderDetail