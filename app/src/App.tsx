import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home.tsx';
import Nav from './components/Nav.tsx';
import Login from './views/Login.tsx';
import Winners from './views/Winners.tsx';
import Register from './views/Register.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/winners" element={<Winners />} />
      </Routes>
    </Router>
  );
};

export default App;
