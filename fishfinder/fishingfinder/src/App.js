import logo from "./logo.svg";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { TestDbButton } from "./components/testing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Profile } from "./pages/Profile";
import { LoadScript } from "@react-google-maps/api";
import LoadingBar from "./components/LoadingBar";
import { useState, useEffect } from "react";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [userName, setUserName] = useState("");




  useEffect(() => {
  document.documentElement.classList.add("dark");
  setUserName(localStorage.getItem("username"));
}, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-primary text-black dark:text-white"> 
      <Navbar />
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <LoadingBar
          loading={loading}
          setLoading={setLoading}
          status={status}
          setStatus={setStatus}
        />
        <main className="flex-grow">
        <Routes>
           <Route
            path="/"
            element={<ProtectedRoute><Home setLoading={setLoading} setStatus={setStatus} /></ProtectedRoute>}
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
            element={ <ProtectedRoute><Profile setLoading={setLoading} setStatus={setStatus} /></ProtectedRoute>}
          />
          <Route
            path="/privacy"
            element={<Privacy setLoading={setLoading} setStatus={setStatus} />}
          />
          <Route
            path="/terms"
            element={<Terms setLoading={setLoading} setStatus={setStatus} />}
          />
        </Routes>
        </main>
      <Footer />
      </LoadScript>
     </div>
    </Router>
  );
}

export default App;
