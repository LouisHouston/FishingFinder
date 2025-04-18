import react from "react";
import { useState } from "react";


function RegisterPage (){
    const [registrationForm, setRegistrationForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");


    const submitRegistration = () => {
        fetch("http://127.0.0.1:8000/api/registerUser/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: registrationForm.username,
                email: registrationForm.email,
                password: registrationForm.password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Record inserted:", data);
        })
        .catch(error => {
            console.error("Insert error:", error);
        });
    }

    return (
        <form> 
        <input onChange={(e) => setRegistrationForm({...registrationForm,username: e.target.value})} value={registrationForm.username} type="text" placeholder="Username"/>
        <br/>
        <input onChange={(e) => setRegistrationForm({...registrationForm,email: e.target.value})} value={registrationForm.email} type="email" placeholder="Email"/>
        <br/>
        <input onChange={(e) => setRegistrationForm({...registrationForm,password: e.target.value})} value={registrationForm.password} type="password" placeholder="Password"/>
        <br/>
        <input onChange={(e) => e.target.value} value={setConfirmPassword} type="text" placeholder="Confirm Password"/>
        <button type="button" onClick={submitRegistration} className="links"> Register </button>
        </form>
    );

}

export default RegisterPage;