import React, { useEffect } from "react";
import { useState } from "react";
import { ToRegisterPage } from "../components/registerbutton.jsx";

function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function printUsernamestate() {
    console.log(username);
  }

  function submitLogin() {
    fetch(process.env.REACT_APP_BASE_URL + "login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`LOGIN ERROR: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("user_id", data.user_id);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Login error: ", error);
      });
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-primary dark:text-white transition-colors duration-300">
    <section className="flex flex-col items-center gap-4 min-h-5">
      <form className="justify-center">
        <div className="flex items-center border-2 border-black rounded px-3 py-2 gap-2 w-fit text-2xl font-medium pl-3">
          <label className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Username"
            className="outline-none bg-transparent text-tertiary"
          />
        </div>
        <br />

        <div className="flex items-center border-2 border-black rounded px-3 py-2 gap-2 w-fit text-2xl font-medium pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            />
          </svg>

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="outline-none bg-transparent color-primary text-tertiary"
          />
        </div>
      </form>
      <button
          type="button"
          onClick={submitLogin}
          className="bg-primary text-tertiary px-6 border-2 py-3 rounded-lg font-semibold hover:scale-105 transition duration-200 ease-in-out border-black border-solid "
        >
          Login
        </button>
    </section>
    </div>
  );
}

export default LoginPage;
