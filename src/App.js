import './App.css';
import MenuAppBar from './components/MenuAppBar'
import LandingPage from './components/LandingPage'
import Profile from './components/Profile'
import SignInScreen from './components/SignInScreen'
import RegisterScreen from './components/RegisterScreen'
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
            <Route path="/register" element={<RegisterScreen/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
