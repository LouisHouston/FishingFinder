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

  // Function to turn on dark mode
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  }


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
    <header className="bg-white text-black dark:bg-primary dark:text-white transition-colors duration-300">
      <nav className="flex justify-between items-center p-2">
        <Link to="./" className="text-3xl font-bold text-[#5BC0EB] hover:text-[#D4D6B9] transition">
          <div className="flex justify-center items-center hover:scale-105 transition duration-250 ease-in-out">
            <h1 className="text-3xl font-bold flex ">Fishing Finder</h1>
            <img
              src="https://www.svgrepo.com/show/40264/fish.svg"
              className="size-12 ml-2"
            />
          </div>
        </Link>

        <button onClick={toggleDarkMode}>Toggle Dark Mode</button>


        <div className="flex items-center gap-2">
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
              Sign Out
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
