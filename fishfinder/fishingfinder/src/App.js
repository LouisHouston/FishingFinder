import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/Login';
import { TestDbButton } from './components/testing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
