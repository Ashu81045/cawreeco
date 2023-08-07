import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Store,analytics } from './Layout/Home';
import OrdersPage from './Layout/Orders';
import OrderDetails from './Layout/OrderDetails';


const App = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route exact path='/' Component={OrdersPage} />
          <Route exact path='/orders' Component={OrdersPage}/>
          <Route exact path='/orders/:orderId' Component={OrderDetails}/>
          <Route exact path='/analytics' Component={analytics}/>
          <Route exact path='/store' Component={Store}/>
          {/* Define your routes and components here */}
        </Routes>
    </Router>
  );
};

export default App;
