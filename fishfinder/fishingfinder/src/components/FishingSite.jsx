import React, {useEffect, useState} from "react";


function FishingSite (props) {
        // place has a name, lat, lng, we need the ID so we can link it back to the fishing logs
    const [siteName, setSiteName] = useState("");
    
    
    useEffect( () => {
        setSiteName(props.place.name);
    },[props])


    return ( 
        <>  
        <h1> Fishing Site {props.place.name} </h1>
        </>
    )

}


export default FishingSite