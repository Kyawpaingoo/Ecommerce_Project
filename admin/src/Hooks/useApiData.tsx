import React, { useEffect, useState } from 'react'
import axios from 'axios';

const useApiData = <T,>(urlstring: string) : T | null => {
    const [result, setResult] = useState<T | null>(null);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get<T>(urlstring);
                setResult(response.data);
            }
            catch(error){
                console.error('Error fetching data', error)
            }
        }
        fetchData();
    })
  return result
}

export default useApiData