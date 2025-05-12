import React, {useEffect, useState} from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: '100%',
    height: '300px',
  };
  
  const center = {
    lat: 37.7749,  // Example: San Francisco
    lng: -122.4194
  };
  
  const customMapStyle = [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {featureType:"cities",
    elementType:"labels",
    stylers: [{visibility: "on"}]},
    {
      featureType: "water",
      elementType: "labels",
      stylers: [{ visibility: "on" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#a2daf2" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ visibility: "on" }, { color: "#ffffff" }]
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }]
    }
  ];
  
  function doSomething(){
    console.log("Hello")
  }
  
  function Home() {
    const username = localStorage.getItem('username');
    const [userLocation, setUserLocation ] = useState({lat:null, lng:null});
    const [hasPromptedLocation, setHasPromptedLocation] = useState(false);
    const [waterBodies, setWaterBodies] = useState([]);
    const [placingMarker, setPlacingMarker] = useState(false);
    const [tempMarker, setTempMarker] = useState(null);
    // console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)


    // useEffect will only run this code once when it loads the page
      useEffect( () => {
        if(!hasPromptedLocation){
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // setting users location
            setUserLocation({lat:latitude, lng:longitude});
            setHasPromptedLocation(true);
            // NOTE:debug
            console.log("User's location:", latitude, longitude);
        
            },
          (error) => {
            console.error("Error getting location:", error);
            // need an edge case for if it gets messed up it can retry or stop trying and just allow user 
          }
        );
      }
      },[hasPromptedLocation]);
    

      // if we do have userLocation lets find the nearest BoW
      // with all revelant tags with fish and bait
      useEffect( () => {
        if(userLocation){ 
            fetch("http://127.0.0.1:8000/api/water-bodies/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(data => {
          console.log("Water Bodies: ", data);
          setWaterBodies(data);
        })
        }
      }, [userLocation]);


    return (
      <>
        <header>
          <h1>🐟Fishing Finder🐟</h1>
        </header>
        <section className="mapContainer">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={ userLocation ? userLocation : (center)}
            options={{ styles: customMapStyle}}
            zoom={12}
            onClick={(e) => {
              if (placingMarker){
                const lat = e.latLng.lat();
                const lng = e.latLng.lng();
                setTempMarker({lat, lng});
                setPlacingMarker(false);
              }
            }}
          >
            {waterBodies.map((place, i) => (
    <Marker
      key={i}
      position={{ lat: place.lat, lng: place.lng }}
      title={place.name}
    />
  ))}
  {username ? (<button class="mapButton" onClick={() => {
    setPlacingMarker(true);
  }} > Add a fishing spot</button>)
          : (<label> Must sign in first</label>)}
          </GoogleMap>
        </LoadScript>
        
        </section>
      </>
    );
    }
  
  export default Home;