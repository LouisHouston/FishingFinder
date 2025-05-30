import react, { useState, useEffect } from "react";

function FishForm({ setHasFishForm }) {
  const link = "http://127.0.0.1:8000/api/";
  const [fishForm, setFishForm] = useState({
    name: "",
    salt: false,
    fresh: false,
  });

  const submitFish = (e) => {
    e.preventDefault(); // prevents the page from refreshing

    fetch(link + "submit-fish/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fishForm.name,
        salt: fishForm.salt,
        fresh: fishForm.fresh,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `**Submit Fish** HTTP error! status: ${response.status}`
          );
        }
        setHasFishForm(false);
      })
      .catch((error) => {
        console.error("Submit Fish Insert Error :" + error);
      });
  };
  return (
    <>
      <form>
        <input
          onChange={(e) => setFishForm({ ...fishForm, name: e.target.value })}
          value={fishForm.name}
          type="text"
          placeholder="Name of Fish"
        />
        <br />
        <label>
          Salt
          <input
            onChange={(event) =>
              setFishForm({ ...fishForm, salt: event.target.checked })
            }
            type="checkbox"
          />
        </label>

        <label>
          Fresh
          <input
            type="checkbox"
            onChange={(e) =>
              setFishForm({ ...fishForm, fresh: e.target.checked })
            }
          />
        </label>
        <br />
        <button onClick={submitFish}> Submit Fish</button>
      </form>
    </>
  );
}

export default FishForm;
