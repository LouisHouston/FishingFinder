import react, { useCallback, useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { InfoWindow, Marker } from "@react-google-maps/api";

const MapMarkerWithInfo = ({lat, lng, name}) => {
    const [showInfo, setShowInfo] = useState(false);
    const [markerRef, setMarkerRef] = useState("");
    
    const handleOpen = () => {setShowInfo(true);};
    const handleClose = useCallback(() => setShowInfo(false),[]);

    if(showInfo){
        <InfoWindow anchor={marker} onClose={handleClose}>
            <h2> Example1</h2>
            <p> Example 2</p>
        </InfoWindow>
    }

    const handleMarkerRef = (markerRef) => {
        if (markerRef) {
            setMarker(markerRef);
        }
        else{
          const markRef = new Marker;
          setMarker(markRef);
        }
    };

    return (
    <>
      <Marker
        position={{ lat: lat, lng: lng }} 
        title={name}
        onClick={handleOpen} 
        ref={handleMarkerRef}
      />
      {showInfo && marker && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <h2>{name}</h2>
          <p>Details for {name}</p>
        </InfoWindow>
      )}
    </>)
}

export default MapMarkerWithInfo;