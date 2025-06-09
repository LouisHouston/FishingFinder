import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [userName, setUserName] = useState("");
  const [darkMode, setDarkMode] = useState(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("username");

    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // Function to turn on dark mode
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

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
  const darkMoon = (
    <svg
      class="feather feather-moon"
      className="transition duration-250 ease-in-out"
      fill="none"
      height="24"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );

  const lightSun = (
    <svg
      class="feather feather-sun"
      fill="none"
      height="24"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" x2="12" y1="1" y2="3" />
      <line x1="12" x2="12" y1="21" y2="23" />
      <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
      <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
      <line x1="1" x2="3" y1="12" y2="12" />
      <line x1="21" x2="23" y1="12" y2="12" />
      <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
      <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
    </svg>
  );

  return (
    <header className="bg-white text-black dark:bg-primary dark:text-white transition-colors duration-300">
      <nav className="flex justify-between items-center p-2">
        <Link
          to="./"
          className="text-3xl font-bold text-[#5BC0EB] hover:text-[#D4D6B9] transition"
        >
          <div className="flex justify-center items-center hover:scale-105 transition duration-250 ease-in-out">
            <h1 className="text-3xl font-bold flex ">Fishing Finder</h1>
            <img
              src="https://www.svgrepo.com/show/40264/fish.svg"
              className="size-12 ml-2"
            />
          </div>
        </Link>

        <button onClick={toggleDarkMode}>
          {document.documentElement.classList.contains("dark") ? (
            darkMoon
          ) : (
            lightSun
          )}
        </button>

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
