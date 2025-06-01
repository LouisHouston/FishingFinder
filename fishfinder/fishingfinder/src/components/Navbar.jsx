import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [userName, setUserName] = useState("");

  useEffect(() =>{
    const storedUserName = localStorage.getItem("username");

    if(storedUserName){
      setUserName(storedUserName);
    }
  },[]);

  function logout() {
    const token = localStorage.getItem('authtoken');
    
    fetch(process.env.REACT_APP_BASE_URL+ "logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    localStorage.removeItem('authToken');
    localStorage.removeItem('username')
    window.location.href = '/'
  }


  return (
    <header>
      <nav className="navbar">
        <Link to="./" className="navbar-logo">
          🐟Fishing Finder🐟
        </Link>

        <div className="navbar-link-container">
          {userName ? ( <Link to="./profile" className="navbar-item">
          {userName}
          </Link>) : (
            <Link to="./login" className="navbar-item">
            Login
          </Link>) }
          { userName ? (<button onClick={logout} className="navbar-item"> Sign Out </button>) :  ( <Link to="./register" className="navbar-item">
            Sign Up
          </Link> )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
