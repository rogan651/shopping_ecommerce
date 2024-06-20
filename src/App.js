import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Myorder from './Components/Myorder';
import Cart from './Components/Cart';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Buy from './Components/Buy';
import MultiStepForm from './Components/MultiStepForm';
import Adminpage from './Components/Adminpage';
import Productupload from './Components/Productupload';
import Productdetails from './Components/Productdetails';
import Sidebar from './Components/Sidebar';
import Userinformation from './Components/Userinformation';
import Admincontrolhomepage from './Components/Admincontrolhomepage';
import { UserProvider } from './Context/UserContext';
import { CartProvider } from './Context/CartContext';

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Route>
            {(window.location.pathname.toString().indexOf('admin') === -1) ? <Navbar /> : <Sidebar />}
            <Switch>
              <Route path='/' component={Home} exact />
              <Route path='/Myorder' component={Myorder} exact />
              <Route path='/cart/:productId' component={Cart} exact />
              <Route path='/signup' component={Signup} exact />
              <Route path='/Login' component={Login} exact />
              <Route path='/Buy/:productId' component={Buy} exact />
              <Route path='/MultiStepForm' component={MultiStepForm} exact />
              <Route path='/userinfo' component={Userinformation} exact />
              <Route path='/admin' component={Adminpage} exact />
              <Route path='/admin/Productupload' component={Productupload} exact />
              <Route path='/admin/Productdetails' component={Productdetails} exact />
              <Route path='/admin/Admincontrolhomepage' component={Admincontrolhomepage} exact />
              <Route path='/admin/Login' component={Login} exact />
              <Route path='/admin/admininfo' component={Userinformation} exact />
            </Switch>
          </Route>
        </Router>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
