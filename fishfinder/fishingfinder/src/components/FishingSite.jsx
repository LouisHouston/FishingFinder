import React, { useEffect, useState } from "react";
import NewCatchForm from "./NewCatchForm";
import BaitForm from "./BaitForm";
import FishForm from "./FishForm";

function FishingSite(props) {
  const [hasBaitForm, setHasBaitForm] = useState(false); // using this as the toggle for the bait form
  const [hasFishForm, setHasFishForm] = useState(false); // using this as the toggle for the bait form
  const [fishTypes, setFishTypes] = useState([]);
  const [baitTypes, setBaitTypes] = useState([]);
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
        console.log(data.catch_id);
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
        console.log(data);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <h1> Fishing Site {props.place.name} </h1>
      <button
        className="placeNameButton"
        onClick={() => setHasBaitForm((prev) => !prev)}
      >
        
        Bait Form
      </button>
      <button
        className="placeNameButton"
        onClick={() => setHasFishForm((prev) => !prev)}
      >
        Fish Form
      </button>
      {hasBaitForm ? (
        <BaitForm toggle={hasBaitForm} setHasBaitForm={setHasBaitForm} />
      ) : (
        <></>
      )}
      {hasFishForm ? (
        <FishForm toggle={hasFishForm} setHasFishForm={setHasFishForm} />
      ) : (
        <></>
      )}
      <h2> Fishing Log</h2>
      <form>
        <select
          value={catchForm.fish_id}
          onChange={(e) =>
            setCatchForm({ ...catchForm, fish_id: parseInt(e.target.value) })
          }
        >
          <option value="">Choose a Fish</option>
          {fishTypes.map((fish, i) => (
            <option key={i} value={fish.fish_id}>
              {fish.name}
            </option>
          ))}
        </select>
        <select
          value={catchForm.bait_id}
          onChange={(e) =>
            setCatchForm({ ...catchForm, bait_id: parseInt(e.target.value) })
          }
        >
          <option value="">Choose a Bait</option>
          {baitTypes.map((bait, i) => (
            <option key={i} value={bait.bait_id}>
              {bait.name}
            </option>
          ))}
        </select>
        <button className="" onClick={submitCatch}>
          Submit Catch
        </button>
      </form>
    </>
  );
}

export default FishingSite;
