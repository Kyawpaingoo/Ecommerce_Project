import React, { useEffect, useState } from 'react'
import { IApiListHookResult, IApiListResponse } from '../Interface/IApiResponse';
import axios from 'axios';

const useApiList = <T,>(urlstring: string, currentPage: number): IApiListHookResult<T> => {
    const [resultList, setResultList] = useState<T[] | null>([]);
    const [page, setPage] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [prevPage, setPrevPage] = useState<number | null>(0);
    const [nextPage, setNextPage] = useState<number | null>(0);
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get<IApiListResponse<T>>(urlstring,{params: {page: currentPage}});
                setResultList(response.data.docs);
                setPage(response.data.page);
                setCount(response.data.totalDocs);
                setTotalPage(response.data.totalPages);
                setPrevPage(response.data.prevPage);
                setNextPage(response.data.nextPage);
            }
            catch(error){
                console.error('Error fetching data', error)
            }
        }
        fetchData();
    },[urlstring, currentPage])
  return {resultList, page, count, totalPage, prevPage, nextPage}
}

export default useApiList