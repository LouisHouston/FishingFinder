import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { TestDbButton } from "./components/testing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Profile } from "./pages/Profile";
import { LoadScript } from "@react-google-maps/api";
import LoadingBar from "./components/LoadingBar";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
  document.documentElement.classList.add("dark");
}, []);

  return (
    <Router>
      <Navbar />
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <LoadingBar
          loading={loading}
          setLoading={setLoading}
          status={status}
          setStatus={setStatus}
        />
        <Routes>
          <Route
            path="/"
            element={<Home setLoading={setLoading} setStatus={setStatus} />}
          />
          <Route
            path="/login"
            element={
              <LoginPage setLoading={setLoading} setStatus={setStatus} />
            }
          />
          <Route
            path="/register"
            element={
              <RegisterPage setLoading={setLoading} setStatus={setStatus} />
            }
          />
          <Route
            path="/profile"
            element={<Profile setLoading={setLoading} setStatus={setStatus} />}
          />
        </Routes>
      </LoadScript>
    </Router>
  );
}

export default App;
