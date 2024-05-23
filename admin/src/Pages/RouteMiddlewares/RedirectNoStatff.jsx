import { useContext } from "react"
import AuthContext from "../../Context/AuthContext.jsx"
import { Navigate } from "react-router-dom";


const RedirectNotStaff = ({children}) => {
    const {authUser} = useContext(AuthContext);
    if(authUser == false || authUser.role != 'staff'){
      return <Navigate to={"/login"} />
    }

    return children
}

export default RedirectNotStaff