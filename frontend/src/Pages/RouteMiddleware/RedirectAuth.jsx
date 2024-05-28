import React, { useContext } from 'react'
import AuthContext from '../../Context/AuthContext.jsx'
import { Navigate } from 'react-router-dom';

const RedirectAuth = ({children}) => {
  const {authUser} = useContext(AuthContext);

  if(authUser != false){
    return <Navigate to={"/"} />
  }

  return children;
}

export default RedirectAuth