import React, { useEffect, useState } from 'react'
import { IAuthUser } from '../Interface/IAuthUser'
import axios from 'axios';

const useAuth = () => {
    const [authUser, setAuthUser] = useState<IAuthUser | null | false>(null);

    useEffect(()=>{
        const checkAuth = async () =>{
            try{
                const {data} = await axios.get<IAuthUser | string>('/checkAuth');
                if(data === 'not_auth' || !data){
                    setAuthUser(false);
                }
                else if(typeof data === 'object' && (data.role === 'staff' || data.role == 'admin')){
                    setAuthUser(data);
                }
                else{
                    setAuthUser(false);
                }
            }
            catch(error){
                console.error('Error fetching data', error);
            }
        }
        checkAuth();
    },[]);
  return {authUser, setAuthUser}
}

export default useAuth