import React from "react";


 export const Profile = () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('authToken');

    function Logout() {
    
    }

    return (
        <div className="min-h-screen bg-white text-black dark:bg-primary dark:text-white transition-colors duration-300 pt-4" >
            <h1 className="">    Welcome {username} !</h1>
        </div>
    )
}