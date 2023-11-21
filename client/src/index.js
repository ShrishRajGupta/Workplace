import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createContext } from 'react';
import App from './App';

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user,setUser] = useState({});
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setisAuthenticated,
        user,
        setUser
      }}
    >
      <App />
    </Context.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap the entire tree, including AppWrapper, with React.StrictMode
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
