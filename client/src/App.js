// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import routing components
import './App.css';
import Home from './pages/Home';
import ChildLoginPage from './pages/login/child';
import ParentLoginPage from './pages/login/parent';
import RegisterParentPage from './pages/register/parent';
import ParentDashboard from './pages/dashboards/parentDashboard';
import ChildDashboard from './pages/dashboards/childDashboard';
function App() {
  return (
    <Router> {/* Wrap the app in Router */}
      <div className="App">
        <Routes>
          <Route path="/login/parent" element={<ParentLoginPage/>}/>
          <Route path="/register/parent" element={<RegisterParentPage/>}/>
          <Route path="/login/child" element={<ChildLoginPage/>}/>
          <Route path="/parent" element={<ParentDashboard/>}/>
          <Route path="/child" element={<ChildDashboard/>}/>
          <Route path="/" element={<Home />} /> {/* Set the Home component to render at the root path */}
          {/* You can add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
