import react, { useEffect, useState } from "react";

function FishingLog({bow_id}) {
  const [fishingLogs, setFishingLogs] = useState([]);

  useEffect(() => {
    console.log("Updating BoW")
    getFishingLogs(bow_id);
  }, [bow_id]);

  const getFishingLogs = (bow_id) => {
    fetch(process.env.REACT_APP_BASE_URL + "get-fishing-logs/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {
          bow_id,
        }),
      })
      .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to get fishing logs");
          }
          return res.json();
        })
        .then((data) => {
          setFishingLogs(data);
          console.log(fishingLogs)
        });
  };

  return (
    <>
      <h2> Fishing Log</h2>
      <ul>
      {fishingLogs.map( (log,i)=> {
       return  <li key={i}>  {log.username} caught a {log.fish_name} using {log.bait_name}
 </li>
      })}
      </ul>
    </>
  );
}

export default FishingLog;
