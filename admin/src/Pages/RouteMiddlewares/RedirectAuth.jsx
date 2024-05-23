import { useContext } from "react"
import AuthContext from "../../Context/AuthContext.jsx"
import { Navigate } from "react-router-dom";


const RedirectAuth = ({children}) => {
    const {authUser} = useContext(AuthContext);
    if(!authUser){
      return children
    }
    return <Navigate to={"/"} />
    
}

export default RedirectAuth