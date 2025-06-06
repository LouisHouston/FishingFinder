import react, { useState, useEffect } from "react";

function BaitForm({ setHasBaitForm }) {
  let link = process.env.REACT_APP_BASE_URL;
  const [baitForm, setBaitForm] = useState({
    name: "",
    salt: false,
    fresh: false,
  });

  const submitBaitForm = (e) => {
    console.log(link)
    e.preventDefault(); //stop from refreshing
    fetch(link + "submit-bait/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: baitForm.name,
        salt: baitForm.salt,
        fresh: baitForm.fresh,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `**Submit BAIT** HTTP error! status: ${response.status}`
          );
        }
        setHasBaitForm(false);
      })
      .catch((error) => {
        console.error("Submit Fish Insert Error :" + error);
      });
  };

  return (
    <div className="col-span-1 row-start-3">
      <form>
        <input
          onChange={(e) => setBaitForm({ ...baitForm, name: e.target.value })}
          type="text"
          placeholder="Type of Bait"
        />
        <br />
        <label>
          Salt
          <input
            type="checkbox"
            onChange={(e) =>
              setBaitForm({ ...baitForm, salt: e.target.checked })
            }
          />
        </label>
        <label>
          Fresh
          <input
            type="checkbox"
            onChange={(e) =>
              setBaitForm({ ...baitForm, fresh: e.target.checked })
            }
          />
        </label>
        <br />
        <button
        className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onClick={submitBaitForm}>Submit Bait</button>
      </form>
    </div>
  );
}

export default BaitForm;
