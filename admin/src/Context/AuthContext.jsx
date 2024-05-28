import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export const AuthContextProvider = (props) =>{
    const [authUser, setAuthUser] = useState(null);

    useEffect(()=>{
            axios.get('/checkAuth').then(({data})=>{
                //console.log(data)
                if (data === 'not_auth' || !data) {
                    setAuthUser(false); // User is not authenticated
                    console.log(authUser)
                } else if (data.role === 'staff' || data.role === 'admin') {
                    setAuthUser(data); // User is authenticated as staff or admin
                    console.log(authUser)
                } else {
                    setAuthUser(false); // User is not authenticated (handle other cases)
                    console.log(authUser)
                } 
            
            }).catch(error =>{
                console.error(error)
                setAuthUser(false);
            })
    },[])
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext