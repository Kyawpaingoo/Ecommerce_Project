import React, { useEffect, useState } from 'react'
import { IUser } from '../Interface/IUser';
import axios from 'axios';

const useUserList = (urlstring: string) : IUser[] | null => {
    const [userList, setUserList] = useState<IUser[] | null>(null);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get<IUser[]>(urlstring);
                setUserList(response.data);
            }
            catch(error){
                console.error('Error fetching data', error);
            }
        }
        fetchData()
    },[urlstring])
  return userList
}

export default useUserList