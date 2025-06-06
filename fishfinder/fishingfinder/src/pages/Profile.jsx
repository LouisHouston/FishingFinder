import React from "react";


 export const Profile = () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('authToken');

    function Logout() {
    
    }





    return (
        <div >
            <h1 className="font-medium">    Welcome {username} !</h1>
         
        </div>
    )
}