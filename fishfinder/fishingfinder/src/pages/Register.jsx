import react from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const link = "http://127.0.0.1:8000/api/registerUser/"
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
    if (honeyPot.trim() !== ""){
      return
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
        navigate("/")
      })
      .catch((error) => {
        console.error("Insert error:", error);
      });
  };

  useEffect(() => {
    updatePasswordErrorMessage();
  }, [confirmPassword, registrationForm.password]);

  return (
    <form>
      <input
        onChange={(e) =>
          setRegistrationForm({ ...registrationForm, username: e.target.value })
        }
        value={registrationForm.username}
        type="text"
        placeholder="Username"
      />
      <br />
      <input
        onChange={(e) =>
          setRegistrationForm({ ...registrationForm, email: e.target.value })
        }
        value={registrationForm.email}
        type="email"
        placeholder="Email"
      />
      <br />
      <input
        onChange={(e) =>
          setRegistrationForm({ ...registrationForm, password: e.target.value })
        }
        value={registrationForm.password}
        type="password"
        placeholder="Password"
      />
      <br />
      <input
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        type="password"
        placeholder="Confirm Password"
      />
      <button
        type="button"
        onClick={submitRegistration}
        className="links register-button"
        disabled={!isFormComplete()}
      >
        Register
      </button>
      <input
        onChange={(e) => setHoneyPot(e.target.value)}
        value={honeyPot}
        style={{display:"none"}}
        type="text"
        placeholder="Confirm Email"
      />
      <div id="registration-error-message" style={{display: passwordErrorMessage? "block" : "none", color: "red"}}>
        {passwordErrorMessage}
      </div>
    </form>
  );
}

export default RegisterPage;
