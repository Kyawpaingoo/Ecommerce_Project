import React, { ReactNode, useMemo } from "react";
import { useContext } from "react"
import { Navigate } from "react-router-dom";
import AuthContext from '../../Context/AuthContext';

type RedirectAuthProps = {
  children : ReactNode;
}

const RedirectAuth : React.FC<RedirectAuthProps> = ({children}) => {
    const authContext = useContext(AuthContext);

    const isAuthenticated = useMemo(()=> !!authContext?.authUser , [authContext?.authUser])

    if(!isAuthenticated){
      return children
    }
    return <Navigate to={"/"} />
    
}

export default RedirectAuth