import './App.css';
import MenuAppBar from './components/MenuAppBar'
import LandingPage from './components/LandingPage'
import Profile from './components/Profile'
import SignInScreen from './components/SignInScreen'
import Products from './components/Products'
import RegisterScreen from './components/RegisterScreen'
import PrivacyPolicy from './components/PrivacyPolicy'
import NotFound from './components/NotFound';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we were redirected from the 404.html page
    const searchParams = new URLSearchParams(window.location.search);
    const redirectPath = searchParams.get("p");
    if (redirectPath) {
      navigate(redirectPath);
    }
  }, [navigate]);

  return (
    <div>
        <div>
          <MenuAppBar></MenuAppBar>

          {/* Routes to render different components based on URL */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<SignInScreen/>} />
            <Route path="/register" element={<RegisterScreen/>} />
            <Route path="/premium" element={<Products/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/privacy" element={<PrivacyPolicy/>} />

            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
