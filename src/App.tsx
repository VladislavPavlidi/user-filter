import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Main from './Components/Main';
import Header from './Components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Main />
    </Router>
  );
}

export default App;
