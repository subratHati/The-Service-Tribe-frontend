import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import ServiceCategories from './pages/ServiceCategories';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';

// import './App.css'
import Services from './pages/Services';
import BookingSuccess from './pages/BookingSuccess';
import MyBookings from './pages/MyBookings';

import AdminRoutes from './pages/AdminRoutes';
import ForgotEmail from './pages/ForgetEmail';
import ForgotReset from './pages/ForgetReset';
import OAuthSuccess from './pages/OAuthSuccess';
import OAuthError from './pages/OAuthError';
import PaymentPage from './pages/PaymentPage';

import ProtectedRoute from './components/ProtectedRoute';
import Support from './pages/Support';
import NotFound from './pages/NotFound';



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verify-email' element={<VerifyEmail />}/>
            
            <Route path='/profile' element={
             <ProtectedRoute><Profile /></ProtectedRoute>
              } />
            <Route path='/forgot' element={<ForgotEmail />} />
            <Route path='/forgot-reset' element={<ForgotReset /> } />

            <Route path="/cart" element={ 
             <ProtectedRoute><Cart /></ProtectedRoute>
              } />

            {/* Google auth */}
            <Route path="oauth-success" element={<OAuthSuccess />}/>
            <Route path="oauth-error" element={<OAuthError />}/>


            <Route path='/category' element={<ServiceCategories />} />
            <Route path='category/:category' element={<Services />}/>
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/booking-success' element={<BookingSuccess />} />
            <Route path='/support' element={<Support />} />

            <Route path='/bookings' element={
             <ProtectedRoute><MyBookings /></ProtectedRoute> 
             } />
            <Route path='/paymentPage' element={<PaymentPage />} />


            <Route path='/admin/*' element={<AdminRoutes />} />
            <Route path="*" element={<NotFound />} />

          </Route>
        </Routes>
      </Router>


    </>
  )
}

export default App
