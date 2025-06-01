import react, { useEffect, useState } from "react";

function FishingLog({ bow_id }) {
  const [fishingLogs, setFishingLogs] = useState([]);

  useEffect(() => {
    getFishingLogs(bow_id);
  }, [bow_id]);

  const getFishingLogs = (bow_id) => {
    fetch(process.env.REACT_APP_BASE_URL + "get-fishing-logs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
        if(data[0] != null){
        setFishingLogs(data);}
        else{
          setFishingLogs(null);
        }
      });
  };

  return fishingLogs ? (
    <>
      <h2> Fishing Log</h2>
      <table>
        <thead>
          <tr>
            <th className="th-fishing-log"> Date </th>
            <th className="th-fishing-log"> Fish Caught </th>
            <th className="th-fishing-log"> Caught by </th>
            <th className="th-fishing-log"> Bait Used </th>
          </tr>
        </thead>
        <tbody>
          {fishingLogs.map((log, i) => {
            return (
              <tr className="tr-fishing-log">
                {" "}
                <td> {log.caught_on} </td>
                <td> {log.fish_name} </td>
                <td> {log.username} </td>
                <td> {log.bait_name} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  ) : (
    <>  </>
  );
}

export default FishingLog;
