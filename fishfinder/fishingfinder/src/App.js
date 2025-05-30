import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import { TestDbButton } from './components/testing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { Profile }  from './pages/Profile'
import { LoadScript } from '@react-google-maps/api';

function App() {
  return (
    <Router>
      <Navbar/> 
      <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      </LoadScript>
    </Router>
  );
}

export default App;
