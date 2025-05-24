import React, {useEffect, useState} from "react";


function FishingSite (props) {
        // place has a name, lat, lng, we need the ID so we can link it back to the fishing logs
    const [siteName, setSiteName] = useState("");
    // NOTE: for testing
    let link = 'http://127.0.0.1:8000/api/registerUser/'
    useEffect( () => {
        setSiteName(props.place.name);
    },[props])

    function submitCatch() {
        fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registrationForm.username,
        email: registrationForm.email,
        password: registrationForm.password,
      }),
    })
    }
        // NOTE: we are making a way to add fishing cathces to our DB on this page so its by props.place in the log easier way to link the dbs together

    return ( 
        <>  
        <h1> Fishing Site {props.place.name} </h1>
        <button className="" onClick={submitCatch}> Hello </button>
        </>
    )

}


export default FishingSite