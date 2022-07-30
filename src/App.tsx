import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Main from './Components/Main';

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Main />
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
