import { useContext, useState } from 'react'
import AuthContext from '../Context/AuthContext';

const MyOrderList = () => {
    const [ordreList, setOrderList] = useState([]);
    const {authUser} = useContext(AuthContext);
  return (
    <div>MyOrderList</div>
  )
}

export default MyOrderList