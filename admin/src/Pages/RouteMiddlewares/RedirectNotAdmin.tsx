import React, { ReactNode, useMemo } from "react";
import { useContext } from "react"
import AuthContext from "../../Context/AuthContext.js"
import { Navigate } from "react-router-dom";

type RedirectNotAdminProps = {
  children : ReactNode
}

const RedirectNotAdmin : React.FC<RedirectNotAdminProps> = ({children}) => {
    const authContext = useContext(AuthContext);

    const isNotAuthenticated = useMemo(()=> !authContext?.authUser || (authContext?.authUser && authContext.authUser.role != 'admin'),[authContext?.authUser]);
    
    if(isNotAuthenticated){
      return <Navigate to={"/login"} />
    }

    return children
}

export default RedirectNotAdmin