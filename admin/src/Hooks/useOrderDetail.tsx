import React, { useEffect, useState } from 'react'
import { IOrderDetail } from '../Interface/IOrder'
import axios from 'axios';

const useOrderDetail = (id: string | undefined) => {
    const [orderDetail, setOrderDetail] = useState<IOrderDetail[] | null>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [subtotalPrice, setSubTotalPrice] = useState<number>(0);
    const shippingFees = 10;
    const tax = 5;
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get<IOrderDetail[]>(`/orderDetail/getbyOrderId/${id}`);
                setOrderDetail(response.data);
                const subTotal = response.data.length >= 2 ? response.data.reduce((sum, item)=> sum + item.price  * item.qty, 0) : response.data[0].price;
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

  return {orderDetail, subtotalPrice, totalPrice, shippingFees, tax}
}

export default useOrderDetail