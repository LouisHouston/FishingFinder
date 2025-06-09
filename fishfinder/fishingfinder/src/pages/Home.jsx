import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import FishingSite from "../components/FishingSite";
import FishForm from "../components/FishForm";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 37.7749, // Example: San Francisco
  lng: -122.4194,
};

const customMapStyle = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [{ visibility: "on" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#a2daf2" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }],
  },
];

function Home({setLoading, setStatus}) {
  const username = localStorage.getItem("username");
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [hasPromptedLocation, setHasPromptedLocation] = useState(false);
  const [waterBodies, setWaterBodies] = useState([]);
  const [placingMarker, setPlacingMarker] = useState(false);
  const [tempMarker, setTempMarker] = useState(null);
  const [selectedFishingSite, setSelectedFishingSite] = useState("");
  const [zoomLevel, setZoomLevel] = useState(12);
  const [hasWaterBodyChanged, setHasWaterBodyChanged] = useState(false);
  const [bodyOfWaterForm, setBodyOfWaterForm] = useState({
    name: "",
    lng: null,
    lat: null,
  });
  // console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

  // useEffect will only run this code once when it mounts once
  useEffect(() => {
    if (!hasPromptedLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // setting users location
          setUserLocation({ lat: latitude, lng: longitude });
          setHasPromptedLocation(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          // need an edge case for if it gets messed up it can retry or stop trying and just allow user
        }
      );
    }
  }, [hasPromptedLocation]); // dependency array

  // if we do have userLocation lets find the nearest BoW
  // with all revelant tags with fish and bait
  useEffect(() => {
    if (userLocation) {
      fetch(process.env.REACT_APP_BASE_URL+ "water-bodies/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("Water Bodies: ", data);
          setWaterBodies(data);
          setHasWaterBodyChanged(false);
        });
    }
  }, [hasWaterBodyChanged]);

 

  const handleOpenInfoWindow = async (place) => {
    setLoading(true);
    try {
      setSelectedFishingSite(place);
      setStatus("success");
    }
    catch(e){
      setStatus("error");
    }finally {
      setTimeout( ()=>{
        setLoading(false);
        setStatus(null);
      },550)
    }
    
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-primary dark:text-white transition-colors duration-300">
      <header>
        <div className="flex justify-center items-end">
        <h1 className="text-3xl font-bold flex ">
          Fish Map   </h1>
          </div>
      </header>
      <section>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation ? userLocation : center}
            options={{ styles: customMapStyle }}
            className={`p-4 border ${placingMarker ? 'hover:cursor-crosshair' : 'hover:cursor-not-allowed'}`}
            zoom={zoomLevel}
            onClick={(e) => {
              if (placingMarker) {
                const lat = e.latLng.lat();
                const lng = e.latLng.lng(); 
                setBodyOfWaterForm({ ...bodyOfWaterForm, lat: lat, lng: lng });
                setTempMarker({ lat, lng });
                if (bodyOfWaterForm.name !== "") {
                  fetch(process.env.REACT_APP_BASE_URL + "water-bodies/", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name: bodyOfWaterForm.name,
                      lat: lat,
                      lng: lng,
                    }),
                  })
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error(
                          `HTTP error! status: ${response.status}`
                        );
                      }
                      return response.json();
                    })
                    .then((data) => {
                      console.log("Record inserted into Body of Water:", data);
                      setHasWaterBodyChanged(true);
                    })
                    .catch((error) => {
                      console.log("Payload", JSON.stringify({
                        name: bodyOfWaterForm.name,
                        lat: bodyOfWaterForm.lat,
                        lng: bodyOfWaterForm.lng
                      }))
                      console.error("Insert error for Body of Water:", error);
                    });
                }
              }
              setPlacingMarker(false);
            }}
          >
            {waterBodies.map((place, i) => (
              <Marker
                key={place.id}
                position={{ lat: place.lat, lng: place.lng }}
                title={"running"}
                onClick={() => handleOpenInfoWindow(place)}
              />
            ))}
          </GoogleMap>
        {username ? (
              <button
                className="bg-secondary dark:bg-tertiary border-secondary border-solid rounded radius-2 "
                onClick={() => {
                  setPlacingMarker(true);
                }}
              >
                Add a fishing hole
              </button>
            ) : (
              <label> Must sign in first</label>
            )}
        {placingMarker ? (
          <input
            onChange={(e) =>
              setBodyOfWaterForm({ ...bodyOfWaterForm, name: e.target.value })
            }
            value={bodyOfWaterForm.name}
            type="text"
            className="dark:text-white  bg-transparent text-primary"
            placeholder="Name the body of water"
          />
        ) : (
          <> </>
        )}

        {selectedFishingSite ? (
          <FishingSite place={selectedFishingSite} />
        ) : (
          <p> Must select fishing place first</p>
        )}
      </section>
    </div>
  );
}

export default Home;
