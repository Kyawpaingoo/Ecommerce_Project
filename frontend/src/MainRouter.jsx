import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Home from './Pages/Home'
import { AuthContextProvider } from './Context/AuthContext'
import Review from './Pages/Review.jsx'
import Contact from './Pages/Contact.jsx'
import Product from './Pages/Product.jsx'
import ProductDetail from './Pages/ProductDetail.jsx'
import Order from './Pages/Orders/Order.jsx'
import RedirectAuth from './Pages/RouteMiddleware/RedirectAuth.jsx'
import RedirectNotAuth from './Pages/RouteMiddleware/RedirectNotAuth.jsx'
import { useEffect } from 'react'
import Complete from './Pages/Orders/Complete.jsx'
import MyOrderList from './Pages/MyOrderList.jsx'
import MyOrderDetail from './Pages/MyOrderDetail.jsx'
const MainRouter = () => {
  useEffect(()=>{}, []);``
  return (
    <BrowserRouter>
      <AuthContextProvider>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={
                <RedirectAuth>
                  < Login />
                </RedirectAuth>              
              } />
              <Route path='/register' element={<Register />} />
              <Route path='/Product' element={<Product />} />
              <Route path='/Review' element={<Review />} />
              <Route path='/Contact' element={<Contact />} />
              <Route path='/productDetail/:id' element={<ProductDetail />} />
              <Route path='/order/:id' element={
                <RedirectNotAuth>
                  <Order />
                </RedirectNotAuth>
                } />
                <Route path='/complete' element={<Complete />} />
                <Route path='/myorder' element={<MyOrderList />} />
                <Route path='/orderDetail/:id' element={<MyOrderDetail />} />
          </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default MainRouter