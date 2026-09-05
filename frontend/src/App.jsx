import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Home         from './assets/pages/home/home';
import Menu         from './assets/pages/Menu/Menu';
import Cart         from './assets/pages/Cart/Cart';
import AboutPage    from './assets/pages/AboutPages/AboutPage';
import ContactPage  from './assets/pages/ContactPage/ContactPage';
import SignUp       from './assets/components/SignUp/SignUp';
import Checkout     from './assets/pages/Checkout/Checkout';
import MyOrders     from './assets/pages/MyOrders/MyOrders';
import PrivateRoute from './assets/components/PrivateRoute/PrivateRoute';

const App = () => (
  <StoreProvider>
    <Routes>
      <Route path='/'        element={<Home />} />
      <Route path='/menu'    element={<Menu />} />
      <Route path='/about'   element={<AboutPage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/login'   element={<Home />} />
      <Route path='/signup'  element={<SignUp />} />

      {/* Protected routes */}
      <Route path='/cart' element={
        <PrivateRoute><Cart /></PrivateRoute>
      } />
      <Route path='/checkout' element={
        <PrivateRoute><Checkout /></PrivateRoute>
      } />
      <Route path='/myorders' element={
        <PrivateRoute><MyOrders /></PrivateRoute>
      } />
    </Routes>
  </StoreProvider>
);

export default App;
