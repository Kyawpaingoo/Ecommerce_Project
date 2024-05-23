import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './Pages/Dashboard.jsx';
import Login from './Pages/Auth/Login.jsx';
import{ AuthContextProvider } from './Context/AuthContext.jsx';
import ProductList from './Pages/Product/ProductList.jsx';
import ProductCreate from './Pages/Product/ProductCreate.jsx';
import OrderList from './Pages/Order/OrderList.jsx';
import OrderDetail from './Pages/Order/OrderDetail.jsx';
import UserList from './Pages/User/UserList.jsx';
import RedirectAuth from './Pages/RouteMiddlewares/RedirectAuth.jsx';
import RedirectNotStaff from './Pages/RouteMiddlewares/RedirectNoStatff.jsx';
import RedirectNotAdmin from './Pages/RouteMiddlewares/RedirectNotAdmin.jsx';

const MainRouter = () => {
    return(
        <BrowserRouter>
        <AuthContextProvider>
            <Routes>
                <Route path='/' element={
                    <Dashboard />
                }/> 
                <Route path='/login' element={
                    <RedirectAuth>
                        <Login />
                    </RedirectAuth>
                }/>
                <Route path='/product' element={
                    <RedirectNotStaff>
                        <ProductList />
                    </RedirectNotStaff>
                }/>
                <Route path='product/create' element={
                    <RedirectNotStaff>
                        <ProductCreate /> 
                    </RedirectNotStaff>
                } />

                <Route path='/customer' element={
                    <RedirectNotAdmin>
                        <UserList />
                    </RedirectNotAdmin>
                }/>
                <Route path='order' element={
                    <RedirectNotAdmin>
                         <OrderList />
                    </RedirectNotAdmin>
                } />
                <Route path='orderDetail/:id' element={
                     <RedirectNotAdmin>
                        <OrderDetail /> 
                     </RedirectNotAdmin>
                } />
            </Routes>
        </AuthContextProvider>
        </BrowserRouter>
    )
}

export default MainRouter