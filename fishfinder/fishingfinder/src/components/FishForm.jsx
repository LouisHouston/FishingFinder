import react, { useState, useEffect } from "react";

function FishForm({ setHasFishForm }) {
  const [fishForm, setFishForm] = useState({
    name: "",
    salt: false,
    fresh: false,
  });

  const submitFish = (e) => {
    e.preventDefault(); // prevents the page from refreshing

    fetch(process.env.REACT_APP_BASE_URL + "submit-fish/", {
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
    <div className="col-span-1 col-start-2 row-start-3">
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
        <button
        className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        onClick={submitFish}> Submit Fish</button>
      </form>
    </div>
  );
}

export default FishForm;
