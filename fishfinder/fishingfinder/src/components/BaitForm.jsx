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
    <>
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
        <button onClick={submitBaitForm}>Submit Bait</button>
      </form>
    </>
  );
}

export default BaitForm;
