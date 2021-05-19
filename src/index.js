import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { HashRouter as Router } from "react-router-dom";
import { Context } from "./Context";

ReactDOM.render(
  <Context.Provider value={{
      setIsLoggedIn: function(){}
    }}>
    <Router>
      <App />
    </Router>
  </Context.Provider>
  ,document.getElementById('root')
);