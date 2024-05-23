import { useContext } from "react"
import AuthContext from "../../Context/AuthContext.jsx"
import { Navigate } from "react-router-dom";


const RedirectNotAuth = ({children}) => {
    const {authUser} = useContext(AuthContext);
   
    if(!authUser){
      return <Navigate to={"/login"} />
    }
    
    return children
}

export default RedirectNotAuth