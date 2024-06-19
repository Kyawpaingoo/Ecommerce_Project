import React, { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react'
import { IAuthUser } from '../Interface/IAuthUser';
import useAuth from '../Hooks/useAuth';

type AuthContextType = {
    authUser : IAuthUser | null | false,
    setAuthUser : React.Dispatch<React.SetStateAction<IAuthUser | null | false>>;
}

const AuthContext = createContext<AuthContextType>({
    authUser: null,
    setAuthUser: ()=>{}
});

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContextProvider : React.FC<AuthProviderProps> = (props : any) =>{
    const {authUser ,setAuthUser} = useAuth();
    
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext