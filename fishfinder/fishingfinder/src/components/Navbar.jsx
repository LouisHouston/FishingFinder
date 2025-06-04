import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("username");

    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  function logout() {
    const token = localStorage.getItem("authtoken");

    fetch(process.env.REACT_APP_BASE_URL + "logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    window.location.href = "/";
  }

  return (
    <header>
      <nav className="navbar">
        <Link to="./" className="navbar-logo">
          🐟Fishing Finder🐟
        </Link>

        <div className="navbar-link-container">
          {userName ? (
            <Link
              to="./profile"
              className="flex items-center border-2 border-secondary  rounded-xl px-3 py-2 gap-2 w-fit text-2xl font-medium pl-3 text-tertiary hover:bg-tertiary hover:text-primary"
            >
              {userName}
            </Link>
          ) : (
            <Link
              to="./login"
              className="flex items-center border-2 border-secondary  rounded-xl px-3 py-2 gap-2 w-fit text-2xl font-medium pl-3 text-tertiary hover:bg-tertiary hover:text-primary"
            >
              Login
            </Link>
          )}
          {userName ? (
            <button
              onClick={logout}
              className="flex items-center border-2 border-secondary  rounded-xl px-3 py-2 gap-2 w-fit text-2xl font-medium pl-3 text-tertiary hover:bg-tertiary hover:text-primary"
            >
              {" "}
              Sign Out{" "}
            </button>
          ) : (
            <Link
              to="./register"
              className="flex items-center border-2 border-secondary  rounded-xl px-3 py-2 gap-2 w-fit text-2xl font-medium pl-3 text-tertiary hover:bg-tertiary hover:text-primary"
            >
              Sign Up
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
