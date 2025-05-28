import React, {useEffect, useState} from "react";

function FishingSite (props) {
    const [catchForm, setCatchForm] = useState({
        typeOfFish: "",
        fishName: "",
        fresh: false,
        salt:false
    });

    const [baitForm, setBaitForm] = useState({
        BaitID: 0,
        fresh: false,
        salt: false
    })

    const [fishTypes, setFishTypes] = useState([]);

    // place has a name, lat, lng, we need the ID so we can link it back to the fishing logs
    const [siteName, setSiteName] = useState("");
    // NOTE: for testing
    const link = 'http://127.0.0.1:8000/api/'

    // on render
    useEffect (() => { 
        getFishTypes()
    },[])

    // on change of body of water selected
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
            setFishTypes(data);
        } )
        .catch(err => console.error(err));
    }

    function getBaitTypes() {
        fetch(link+'bait-types/', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then(res => {
            if(!res.ok) throw new Error('Result for bait types call was not good')
            return res.json()}) //turning result into JSON omg its json() not .JSON moron
        .then(data=> { //do something with this data
            setFishTypes(data);
        } )
        .catch(err => console.error(err));
    }
        // NOTE: we are making a way to add fishing cathces to our DB on this page so its by props.place in the log easier way to link the dbs together
        // so we can link the body of water id to the catch

    return ( 
        <>  
        <h1> Fishing Site {props.place.name} </h1>
        <select id="fishTypes">
            { 
                fishTypes.map( (fish,i) => {
                    return <option key={i}> {fish.name} </option>
                })
            }
        </select>
        <button className="" onClick={getFishTypes}> Submit Catch </button>

        </>
    )

}


export default FishingSite