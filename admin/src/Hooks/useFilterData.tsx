import React, { useEffect, useState } from 'react'
import { IFilterData } from '../Interface/IFilterData';
import axios from 'axios';

const useFilterData = (urlstring: string) : IFilterData | null => {
    const [filterList, setFilterList] = useState<IFilterData | null>(null);

    useEffect(()=>{
        let isApiSubscribed = true;
        const fetchData = async () =>{
            try{
                const respone = await axios.get<IFilterData>(urlstring);
                setFilterList(respone.data);
            }
            catch(error){
                console.error('Error fetching data', error)
            }
        }
        fetchData();
        return ()=>{
            isApiSubscribed = false;
        }
    }, [urlstring])
  return filterList
}

export default useFilterData