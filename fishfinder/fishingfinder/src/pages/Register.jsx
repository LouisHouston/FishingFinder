import react from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const link = process.env.REACT_APP_BASE_URL + "registerUser/";
  const [registrationForm, setRegistrationForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [honeyPot, setHoneyPot] = useState("");

  const navigate = useNavigate();

  const isFormComplete = () => {
    return (
      registrationForm.username.trim() !== "" &&
      registrationForm.email.trim() !== "" &&
      registrationForm.password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      confirmPassword.trimEnd() === registrationForm.password.trim()
    );
  };

  // NOTE: (register ,error ,messages) Where we can update things for register error messages
  const updatePasswordErrorMessage = () => {
    // Only update when confirm password field has been touched
    if (confirmPassword !== "") {
      if (confirmPassword !== registrationForm.password) {
        setPasswordErrorMessage("Passwords do not match");
      } else {
        setPasswordErrorMessage("");
      }
    }
  };

  const submitRegistration = () => {
    if (honeyPot.trim() !== "") {
      return;
    }
    fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registrationForm.username,
        email: registrationForm.email,
        password: registrationForm.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Record inserted:", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Insert error:", error);
      });
  };

  useEffect(() => {
    updatePasswordErrorMessage();
  }, [confirmPassword, registrationForm.password]);

  return (
    <div className=" bg-white text-black dark:bg-primary dark:text-white transition-colors duration-300">
      <form className="grid grid-cols-1 gap-4 w-full max-w-md mx-auto">
        <div className="flex justify-center items-end">
        <h1 className="text-3xl font-bold flex ">
          Angler Sign Up </h1>
          </div>
        <div className="flex col-start-1 items-center border-2 border-black rounded px-3 py-2 gap-2 text-2xl font-medium pl-2 text-tertiary">
          <img
            src="https://www.svgrepo.com/show/487976/username.svg"
            className="size-9"
          ></img>
          <input
            onChange={(e) =>
              setRegistrationForm({
                ...registrationForm,
                username: e.target.value,
              })
            }
            value={registrationForm.username}
            className="w-full bg-transparent outline-none border-none"
            type="text"
            placeholder="Username"
          />
        </div>
        <br />
        <div className="flex col-start-1 items-center border-2 border-black rounded px-3 py-2 gap-2 text-2xl font-medium pl-2 text-tertiary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-9 text-black"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          <input
            onChange={(e) =>
              setRegistrationForm({
                ...registrationForm,
                email: e.target.value,
              })
            }
            value={registrationForm.email}
            className="w-full bg-transparent outline-none border-none"
            type="email"
            placeholder="Email"
          />
        </div>
        <br />
        <div className="flex col-start-1 items-center border-2 border-black rounded px-3 py-2 gap-2 text-2xl font-medium pl-2 text-tertiary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-9 text-black"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            />
          </svg>

          <input
            onChange={(e) =>
              setRegistrationForm({
                ...registrationForm,
                password: e.target.value,
              })
            }
            value={registrationForm.password}
            className="w-full bg-transparent outline-none border-none"
            type="password"
            placeholder="Password"
          />
        </div>
        <br />
        <div className="flex col-start-1 items-center border-2 border-black rounded px-3 py-2 gap-2 text-2xl font-medium pl-2 text-tertiary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-9 text-black"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            />
          </svg>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="w-full bg-transparent outline-none border-none"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <br/>
        <button
          type="button"
          onClick={submitRegistration}
          className="flex col-start-1 row-span-2 items-center border-2 border-black rounded px-3 py-2 gap-2 w-full text-2xl font-medium pl-2 hover:bg-tertiary"
          disabled={!isFormComplete()}
        >
          Register
        </button>
        <input
          onChange={(e) => setHoneyPot(e.target.value)}
          value={honeyPot}
          style={{ display: "none" }}
          type="text"
          placeholder="Confirm Email"
        />
        <div
          id="registration-error-message"
          style={{
            display: passwordErrorMessage ? "block" : "none",
            color: "red",
          }}
        >
          {passwordErrorMessage}
        </div>
      </form>
      </div>
  );
  
}

export default RegisterPage;
