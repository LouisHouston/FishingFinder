import React from "react";


 export const Profile = () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('authToken');

    function Logout() {
    
    }





    return (
        <div>
            Welcome {username}
        </div>
    )
}