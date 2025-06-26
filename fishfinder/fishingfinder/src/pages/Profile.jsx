import React from "react";
import Achievements from "../components/Achievements";
import Streaks from "../components/Streaks";
import Records from "../components/Records";
import { useEffect } from "react";
import Settings from "../components/Settings";
import Favorites from "../components/Favorites";

export const Profile = () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    document.title = `${username} | Fishing Finder`;
  }, []);

  return (
    <div className=" bg-white text-black dark:bg-primary dark:text-red-400 transition-colors duration-300 gap-4 flex flex-col">
      <h1 className="text-center text-2xl"> Welcome {username} !</h1>
      <Achievements />
      <Streaks />
      <Records />
      <Settings />
      <Favorites />
    </div>
  );
};
