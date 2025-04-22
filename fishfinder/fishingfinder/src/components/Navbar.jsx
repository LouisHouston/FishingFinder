import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [userName, setUserName] = useState("");

  useEffect(() =>{
    const storedUserName = localStorage.getItem("username");

    if(storedUserName){
      setUserName(storedUserName);
    }
  })

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
          <Link to="./register" className="navbar-item">
            Sign Up
          </Link> 
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
