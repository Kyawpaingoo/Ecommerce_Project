import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export const AuthContextProvider = (props) =>{
    const [authUser, setAuthUser] = useState(false);

    useEffect(()=>{
        const checkAuth = async()=>{
            await axios.get('/checkAuth').then(({data})=>{
                console.log(data)
            if(data =='not auth' || !data){
                setAuthUser(false);
            }
            else if(data && data.role == 'user'){
                setAuthUser(data);
            }
        })
        }   
        checkAuth();
    },[])
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext