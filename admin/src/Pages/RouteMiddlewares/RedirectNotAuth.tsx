import React, { ReactNode, useMemo } from "react";
import { useContext } from "react"
import AuthContext from "../../Context/AuthContext.js"
import { Navigate } from "react-router-dom";

type RedirectNotAuthProps = {
  children : ReactNode
}

const RedirectNotAuth : React.FC<RedirectNotAuthProps> = ({children}) => {
    const authContext = useContext(AuthContext);

    const IsNotAuthenticated = useMemo(()=> !authContext?.authUser, [authContext?.authUser]);
    if(IsNotAuthenticated){
      return <Navigate to={"/login"} />
    }
    
    return children
}

export default RedirectNotAuth