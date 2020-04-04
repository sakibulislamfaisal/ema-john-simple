import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Notfound from './components/Notfound/Notfound';
import ProductReview from './components/ProductReview/ProductReview';
import { AuthContextProvider , PrivateRoute } from './components/Login/useAuth';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';



function App() {
  return (
    <div >
      
<AuthContextProvider>
        <Header></Header>
         <Router>
              <Switch>
                    <Route path="/shop"><Shop></Shop></Route>
                    <Route path="/review"><Review></Review></Route>
                    <Route path="/manage"><Inventory></Inventory></Route>
                    <Route exact path="/"><Shop></Shop></Route>
                    <Route  path="/product/:productkey"><ProductReview></ProductReview></Route>
                    <Route path="/login"><Login></Login></Route>
                    <PrivateRoute path="/shipment"><Shipment></Shipment></PrivateRoute>
                    <Route path="*"><Notfound></Notfound></Route>
                    


              </Switch>
         </Router>
      
         </AuthContextProvider>
    </div>
  );
}

export default App;
