import React, { useMemo } from "react";
import { ReactNode, useContext } from "react"
import { Navigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

type RedirectNotStaffProps = {
  children: ReactNode
}

const RedirectNotStaff : React.FC<RedirectNotStaffProps> = ({children}) => {
    const authContext = useContext(AuthContext);

    const isNotAuthenticated = useMemo(()=> !authContext?.authUser || (authContext?.authUser && authContext.authUser.role !== 'staff'), [authContext?.authUser])

    if(isNotAuthenticated){
      return <Navigate to={"/login"} />
    }

    return children
}

export default RedirectNotStaff