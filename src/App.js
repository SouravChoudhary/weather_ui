import React from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginForm from './components/auth/Login';
import WeatherSearch from './components/weather/WeatherSearch';
import RegistrationForm from './components/auth/Register'

function App() {
  return (
    <Router >
      <div className="app">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/weather" element={<WeatherSearch />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
