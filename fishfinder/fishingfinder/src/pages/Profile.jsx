import React from "react";
import Achievements from "../components/Achievements";
import Streaks from "../components/Streaks";
import Records from "../components/Records";
import { useEffect } from "react";


 export const Profile = () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('authToken');

    useEffect( () =>{
        document.title = `${username} | Fishing Finder` 
    },[])

    return (
        <div className="min-h-screen bg-white text-black dark:bg-primary dark:text-white transition-colors duration-300 pt-4" >
            <h1 className="">    Welcome {username} !</h1>
            <Achievements />
            <Streaks />
            <Records />
        </div>
    )
}