import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './Pages/Dashboard.jsx';
import Login from './Pages/Auth/Login.jsx';
import{ AuthContextProvider } from './Context/AuthContext.jsx';
import ProductList from './Pages/Product/ProductList.jsx';
import ProductCreate from './Pages/Product/ProductCreate.jsx';

const MainRouter = () => {
    return(
        <BrowserRouter>
        <AuthContextProvider>
            <Routes>
                <Route path='/' element={<Dashboard />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/product' element={<ProductList />}/>
                <Route path='product/create' element={<ProductCreate /> } />
            </Routes>
        </AuthContextProvider>
        </BrowserRouter>
    )
}

export default MainRouter