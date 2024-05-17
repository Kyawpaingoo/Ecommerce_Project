import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './Pages/Dashboard.jsx';
import Login from './Pages/Auth/Login.jsx';
import{ AuthContextProvider } from './Context/AuthContext.jsx';
import ProductList from './Pages/Product/ProductList.jsx';

const MainRouter = () => {
    return(
        <BrowserRouter>
        <AuthContextProvider>
            <Routes>
                <Route path='/' element={<Dashboard />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/product' element={<ProductList />}/>
            </Routes>
        </AuthContextProvider>
        </BrowserRouter>
    )
}

export default MainRouter