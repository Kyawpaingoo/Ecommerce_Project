import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export const AuthContextProvider = (props) =>{
    const [authUser, setAuthUser] = useState(false);

    useEffect(()=>{
        axios.get('/checkAuth').then(({data})=>{
            console.log(data)
            switch (data){
                case data == 'not_auth':
                    setAuthUser(false);
                    break;
                case !data.data:
                    setAuthUser(false);
                    break;
                case data.data === 'admin':
                    setAuthUser(true);
                    console.log()
                    break;
                default:
                    setAuthUser(false);
                    break;
            }
            // if(data =='not_auth' ||  !data.data || data.data.role != 'user'){
            //     setAuthUser(false);
            // }
            // if(data.data.role === 'user'){
            //     setAuthUser(data);
            // }
        })
    })
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext