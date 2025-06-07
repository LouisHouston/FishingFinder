import React from "react";


 export const Profile = () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('authToken');

    function Logout() {
    
    }

    return (
        <div className="bg-white text-black dark:bg-primary dark:text-white transition-colors duration-300 h-fill" >
            <h1 className="">    Welcome {username} !</h1>
        </div>
    )
}