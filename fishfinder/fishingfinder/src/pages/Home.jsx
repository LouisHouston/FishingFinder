import React, {useEffect, useState} from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

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
  
  function Home() {
    const username = localStorage.getItem('username');
    const [userLocation, setUserLocation ] = useState({lat:null, lng:null})
    // console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

      useEffect( () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // setting users location
            setUserLocation({lat:latitude, lng:longitude});

            // NOTE:debug
            console.log("User's location:", latitude, longitude);
        
            },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      },[]);
    



    return (
      <>
        <header>
          <h1>🐟Fishing Finder🐟</h1>
          {username ? (<button type="button" > Allow Location?</button>)
          : (<label> Must sign in first</label>)}
        </header>
        <section className="mapContainer">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={ userLocation ? userLocation : (center)}
            options={{ styles: customMapStyle}}
            zoom={10}
          >
            
            {/* You can add Markers or other map components here */}
          </GoogleMap>
        </LoadScript>
        </section>
      </>
    );
    }
  
  export default Home;