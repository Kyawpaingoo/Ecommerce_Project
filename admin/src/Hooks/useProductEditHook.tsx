import React, { useEffect, useState } from 'react'
import { IFilterData } from '../Interface/IFilterData'
import { IProduct } from '../Interface/IProduct';
import axios from 'axios';

const useProductEditHook = (id: string | undefined) => {
    const [filterData, setFilterData] = useState<IFilterData | null>(null);
    const [productData, setProductData] = useState<IProduct | null>(null);

    useEffect(()=>{
        const getData = async()=>{
            try{
                const filterDataRequest = await axios.get('/data/get-filter-data');
                const productRequest = await axios.get('/product/edit/'+id);

                const [filterResponse, productResponse] = await Promise.all([filterDataRequest, productRequest]);
                setFilterData(filterResponse.data);
                setProductData(productResponse.data);
            }
            catch(error){
                console.error('Error fetching Data', error);
            }
        }
        getData();
    },[id])
  return {filterData, productData}
}

export default useProductEditHook