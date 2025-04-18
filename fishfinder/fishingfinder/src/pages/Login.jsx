import React, { useEffect } from "react";
import { useState } from "react";


function LoginPage() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    
    function printUsernamestate () {
        console.log(username);
    }

    function submitLogin() {
        
    }

    return (
        <section className="Login">
            <form>
                <label> Login: </label>
                <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Username"/>
                <br></br>
                <label> Password: </label>
                <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Password"/>
                <button type="button" onClick={submitLogin}> Login </button>
            </form>
        </section>
    )
}

export default LoginPage;