import { useContext } from "react"
import AuthContext from "../../Context/AuthContext.jsx"
import { Navigate } from "react-router-dom";


const RedirectNotAdmin = ({children}) => {
    const {authUser} = useContext(AuthContext);
    if(authUser == false || authUser.role != 'admin'){
      return <Navigate to={"/login"} />
    }

    return children
}

export default RedirectNotAdmin