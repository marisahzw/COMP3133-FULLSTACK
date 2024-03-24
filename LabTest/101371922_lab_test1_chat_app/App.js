import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Signup from './components/Signup';
import Login from './components/Login';
import RoomList from './components/RoomList';
import ChatRoom from './components/ChatRoom';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  // Function to handle successful login
  const handleLogin = (userData) => {
    setUser(userData);
    setError('');
  };

  // Function to handle successful signup
  const handleSignup = (userData) => {
    setUser(userData);
    setError('');
  };

  // Function to handle logout
  const handleLogout = () => {
    setUser(null);
    setError('');
  };

  // Function to handle login error
  const handleLoginError = (errorMessage) => {
    setError(errorMessage);
  };

  // Function to handle signup error
  const handleSignupError = (errorMessage) => {
    setError(errorMessage);
  };

  // Function to check if user is logged in
  const isLoggedIn = () => {
    return user !== null;
  };

  // Function to get user data
  const getUserData = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/auth/user', { withCredentials: true });
      if (res.data.user) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Check if user is already logged in on component mount
  useState(() => {
    getUserData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            path="/signup"
            render={(props) => (
              <Signup
                {...props}
                onSignup={handleSignup}
                onError={handleSignupError}
              />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                onLogin={handleLogin}
                onError={handleLoginError}
              />
            )}
          />
          <Route
            path="/rooms"
            render={(props) => (
              <RoomList
                {...props}
                user={user}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
              />
            )}
          />
          <Route
            path="/chat/:room"
            render={(props) => (
              <ChatRoom
                {...props}
                user={user}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
              />
            )}
          />
          <Route
            path="/"
            render={() => (
              <h1>Welcome to the Chat App</h1>
            )}
          />
        </Switch>
        {error && <div className="error">{error}</div>}
      </div>
    </Router>
  );
};

export default App;
