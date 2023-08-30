import React from 'react';
import RegisterLogin from './components/user/registerLogin';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


// Request Interceptor
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    localStorage.removeItem('token');
    // Redirect to login page
    // Use history.push('/login') if you are inside a component
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

function App() {
  return (
    <div className="App">
      <h1>Interview Simulation App</h1>
      <RegisterLogin />
      {/* Other components */}
    </div>
  );
}

export default App;
