import { useEffect, useState } from 'react'
import { IApiResponse, IProduct, ProductHookResult } from '../Interface/IProduct.tsx'
import axios from 'axios';

const useProductListHook = (urlstring: string) : ProductHookResult => {
    const [productList, setProductList] = useState<IProduct[] | null>([]);
    const [page, setPage] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [prevPage, setPrevPage] = useState<number | null>(0);
    const [nextPage, setNextPage] = useState<number | null>(0);

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const respones = await axios.get<IApiResponse>(urlstring);
                setProductList(respones.data.docs);
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
  return {productList, page, count, totalPage, prevPage, nextPage};
}

export default useProductListHook