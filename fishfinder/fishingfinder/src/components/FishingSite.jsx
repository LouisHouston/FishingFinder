import React, { useEffect, useState } from "react";
import NewCatchForm from "./NewCatchForm";
import BaitForm from "./BaitForm";
import FishForm from "./FishForm";
import FishingLog from "./FishingLog";

function FishingSite(props) {
  const [hasBaitForm, setHasBaitForm] = useState(false); // using this as the toggle for the bait form
  const [hasFishForm, setHasFishForm] = useState(false); // using this as the toggle for the bait form
  const [fishTypes, setFishTypes] = useState([]);
  const [baitTypes, setBaitTypes] = useState([]);
  const [currentBoW, setCurrentBoW] = useState([])
  const [fishingLogs, setFishingLogs] = useState([]);
  const [catchForm, setCatchForm] = useState({
    fish_id: "",
    bait_id: "",
    bow_id: props.place.id,
  });

  // place has a name, lat, lng, we need the ID so we can link it back to the fishing logs
  const [siteName, setSiteName] = useState("");
  const link = process.env.REACT_APP_BASE_URL;

  // on render
  useEffect(() => {
    getFishTypes();
    getBaitTypes();
  }, [hasBaitForm, hasFishForm]);

  // on change of body of water selected
  useEffect(() => {
    setSiteName(props.place.name);
    setCurrentBoW(props.place.id);
  }, [props]);

  useEffect(() => {
    console.log(catchForm.bait_id);
  }, [catchForm]);

  const submitCatch = (e) => {
    console.log(catchForm);
    console.log(localStorage.getItem("user_id"))
    e.preventDefault();
    fetch(link + "submit-catch/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fish_id: catchForm.fish_id,
        bait_id: catchForm.bait_id,
        bow_id: catchForm.bow_id,
        user_id: localStorage.getItem("user_id"),
      }),
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Failure to submit catch to backend point");
        return res.json();
      })
      .then((data) => {
      })
      .catch((err) => console.error("Submit Catch ERR: ", err));
  };


  function getFishTypes() {
    fetch(link + "fish-types/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Result for fishTypes call was no good");
        return res.json();
      }) //turning result into JSON
      .then((data) => {
        //then do something with this data
        setFishTypes(data);
      })
      .catch((err) => console.error(err));
  }

  function getBaitTypes() {
    fetch(link + "bait-types/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Result for bait types call was not good");
        return res.json();
      }) //turning result into JSON omg its json() not .JSON moron
      .then((data) => {
        //do something with this data
        setBaitTypes(data);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="grid grid-cols-2 grid-row-5 gap-4 w-full mx-auto mt-8 response-text-base">
      <h1 className="col-span-2 
        row-span-1 
        row-start-1 
        text-3xl 
        text-center
        responsive-heading"> 
        Fishing Site {props.place.name} 
      </h1>
      
       <button
        className="col-span-1 col-start-1 row-start-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-tertiary dark:border-gray-600 dark:placeholder-gray-400 dark:text-primnary dark:focus:ring-blue-500 dark:focus:border-blue-500 justify-center"
        onClick={() => setHasBaitForm((prev) => !prev)}
      >
        New Bait Form
      </button>
      
      
      {hasBaitForm ? (
        <BaitForm toggle={hasBaitForm} setHasBaitForm={setHasBaitForm} />
      ) : (
        <></>
      )}
      <FishingLog bow_id={props.place.id} />
     
      <button
        className="col-span-1 col-start-2 row-start-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-tertiary dark:border-gray-600 dark:placeholder-gray-400 dark:text-primnary dark:focus:ring-blue-500 dark:focus:border-blue-500 justify-center"
        onClick={() => setHasFishForm((prev) => !prev)}
      >
        New Fish Form
      </button>
      {hasFishForm ? (
        <FishForm toggle={hasFishForm} setHasFishForm={setHasFishForm} />
      ) : (
        <></>
      )}   


      <form className="col-span-2 row-start-5 row-span-1 w-1/4 items-center mx-auto ">
        <select
          value={catchForm.fish_id}
          className ="bg-transparent dark:bg-primary"
          onChange={(e) =>
            setCatchForm({ ...catchForm, fish_id: parseInt(e.target.value) })
          }
        >
          <option value="" className="bg-white decoration-none text-nowrap dark:text-white dark:bg-primary dark:bg-transparent outline-none transition-colors duration-300">Choose a Fish</option>
          {fishTypes.map((fish, i) => (
            <option key={i}  className="bg-white decoration-none text-nowrap dark:text-white dark:bg-primary"value={fish.fish_id}>
              {fish.name}
            </option>
          ))}
        </select>
        <select
          value={catchForm.bait_id}
          className="bg-transparent dark:bg-primary"
          onChange={(e) =>
            setCatchForm({ ...catchForm, bait_id: parseInt(e.target.value) })
          }
        >
          <option value="" className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-tertiary dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 justify-center transition-colors duration-300 ease-in-out">Choose a Bait</option>
          {baitTypes.map((bait, i) => (
            <option key={i} value={bait.bait_id}>
              {bait.name}
            </option>
          ))}
        </select>
        <button className="text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-primary dark:focus:ring-blue-500 dark:focus:border-blue-500 justify-center bg-secondary dark:bg-tertiary border-solid border-opacity-100" onClick={submitCatch}>
          Submit Catch
        </button>
      </form>
    </div>
  );
}

export default FishingSite;
