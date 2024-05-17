import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Home from './Pages/Home'
import { AuthContextProvider } from './Context/AuthContext'
import Review from './Pages/Review.jsx'
import Contact from './Pages/Contact.jsx'
import Product from './Pages/Product.jsx'
const MainRouter = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/Product' element={<Product />} />
              <Route path='/Review' element={<Review />} />
              <Route path='/Contact' element={<Contact />} />
          </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default MainRouter