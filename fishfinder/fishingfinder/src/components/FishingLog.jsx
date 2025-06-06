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
    <div className="w-full col-span-2 flex justify-self-center items-center">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 ">
        <thead>
          <tr>
            <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-white"> Date </th>
            <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-white"> Fish Caught </th>
            <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-white"> Caught by </th>
            <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-white"> Bait Used </th>
          </tr>
        </thead>
        <tbody>
          {fishingLogs.map((log, i) => {
            return (
              <tr className="tr-fishing-log">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary dark:text-tertiary"> {log.caught_on} </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary dark:text-tertiary"> {log.fish_name} </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary dark:text-tertiary"> {log.username} </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary dark:text-tertiary"> {log.bait_name} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <>  </>
  );
}

export default FishingLog;
