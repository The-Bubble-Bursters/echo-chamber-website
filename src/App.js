import './App.css';
import * as React from 'react';
import MenuAppBar from './components/MenuAppBar'
import LandingPage from './components/LandingPage'
import SignInScreen from './components/SignInScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
        <Router>
        <div>
          <MenuAppBar></MenuAppBar>

          {/* Routes to render different components based on URL */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<SignInScreen/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
