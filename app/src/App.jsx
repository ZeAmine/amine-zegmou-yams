import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Competition from './views/Competition';
import Nav from './components/Nav';
import Login from './views/Login';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/competition" element={<Competition />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/basket" element={<Basket />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
