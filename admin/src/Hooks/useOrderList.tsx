import React, { useEffect } from 'react'
import { useState } from 'react';
import { IOrder, IOrderApiResponse, OrderHookResult } from '../Interface/IOrder';
import axios from 'axios';

const useOrderList = (urlstring: string) : OrderHookResult => {
    const [orderList, setOrderList] = useState<IOrder[] | null>([]);
    const [page, setPage] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [prevPage, setPrevPage] = useState<number | null>(0);
    const [nextPage, setNextPage] = useState<number | null>(0);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const respones = await axios.get<IOrderApiResponse>(urlstring);
                
                setOrderList(respones.data.docs);
                setPage(respones.data.page);
                setCount(respones.data.totalDocs);
                setTotalPage(respones.data.totalPages);
                setPrevPage(respones.data.prevPage);
                setNextPage(respones.data.nextPage);
            }
            catch(error){
                console.error('Error fetching data', error);
            }
        }
        fetchData();
    },[urlstring]);
  return {orderList, page, count, totalPage, prevPage, nextPage}
}

export default useOrderList