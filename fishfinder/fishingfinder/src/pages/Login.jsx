import React, { useEffect } from "react";
import { useState } from "react";
import { ToRegisterPage } from "../components/registerbutton.jsx";


function LoginPage() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    
    function printUsernamestate () {
        console.log(username);
    }

    function submitLogin() {
        fetch(process.env.REACT_APP_BASE_URL+"login/", {
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
            if(!response.ok){
                throw new Error(`LOGIN ERROR: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('user_id', data.user_id)
            window.location.href = '/'
        })
        .catch((error) =>{
            console.error("Login error: ", error);
        })
    }

    return (
        <section className="Login">
            <form>
                <label> Login: </label> <br/>
                <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Username"/>
                <br/>
                <label> Password: </label>
                <br/>
                <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Password"/>
                <button type="button" onClick={submitLogin}> Login </button>
            </form>
        </section>
    )
}

export default LoginPage;