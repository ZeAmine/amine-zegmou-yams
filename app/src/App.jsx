import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Nav from './components/Nav';
import Login from './views/Login';
import Winners from './views/Winners';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/winners" element={<Winners />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
