import React, { useEffect, useState } from 'react'
import { IAnalyticsData } from '../Interface/IAnalytics';
import axios from 'axios';

const useAnalyticsData = (urlstring: string) : IAnalyticsData => {
  const [user, setUser] = useState<number>(0);
  const [product, setProduct] = useState<number>(0);
  const [order, setOrder] = useState<number>(0);

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get<IAnalyticsData>(urlstring);
        setUser(response.data.user);
        setProduct(response.data.product);
        setOrder(response.data.order);
      }
      catch(error){
        console.error('Error fetching data', error);
      }
    }
    fetchData();
  },[urlstring])
  return {user, product, order}
}

export default useAnalyticsData