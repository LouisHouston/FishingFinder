import React, {useEffect, useState} from "react";

function FishingSite (props) {
    const [catchForm, setCatchForm] = useState({
        typeOfFish: "",
        fishName: "",
        fresh: false,
        salt:false
    });

    const [baitForm, setBaitForm] = useState({
        BaitID: Int16Array,
        fresh: false,
        salt: false
    })

    // place has a name, lat, lng, we need the ID so we can link it back to the fishing logs
    const [siteName, setSiteName] = useState("");
    // NOTE: for testing
    let link = 'http://127.0.0.1:8000/api/'
    useEffect( () => {
        setSiteName(props.place.name);
    },[props])

    function getFishTypes() {
        fetch(link+'fish-types/', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then(res => {
            if(!res.ok) throw new Error('Result for fishTypes call was no good')
            return res.json()}) //turning result into JSON omg its json() not .JSON moron
        .then(data=> { //do something with this data
            console.log(data);
        } )
        .catch(err => console.error(err));
    }
        // NOTE: we are making a way to add fishing cathces to our DB on this page so its by props.place in the log easier way to link the dbs together
        // so we can link the body of water id to the catch

    return ( 
        <>  
        <h1> Fishing Site {props.place.id} </h1>
        <button className="" onClick={getFishTypes}> Hello </button>
        </>
    )

}


export default FishingSite