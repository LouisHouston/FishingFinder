import React, {useEffect, useState} from "react";
import NewCatchForm from "./NewCatchForm";
import BaitForm from "./BaitForm";
import FishForm from "./FishForm";

function FishingSite (props) {
    const [hasBaitForm, setHasBaitForm] = useState(false); // using this as the toggle for the bait form
    const [hasFishForm, setHasFishForm] = useState(false); // using this as the toggle for the bait form
    const [fishTypes, setFishTypes] = useState([]);
    const [baitTypes, setBaitTypes] = useState([]);


    // place has a name, lat, lng, we need the ID so we can link it back to the fishing logs
    const [siteName, setSiteName] = useState("");
    // NOTE: for testing
    const link = 'http://127.0.0.1:8000/api/'

    // on render
    useEffect (() => { 
        getFishTypes()
        getBaitTypes()
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
            setBaitTypes(data);
        } )
        .catch(err => console.error(err));
    }
        // NOTE: we are making a way to add fishing cathces to our DB on this page so its by props.place in the log easier way to link the dbs together
        // so we can link the body of water id to the catch

    return ( 
        <>  
        <h1> Fishing Site {props.place.name} </h1>
        <button className="placeNameButton" onClick={ () => setHasBaitForm(prev => !prev)}> Bait Form </button>
        <button className="placeNameButton" onClick={() => setHasFishForm(prev => !prev)}> Fish Form </button>
        { hasBaitForm ? (<BaitForm toggle={hasBaitForm} setHasBaitForm={setHasBaitForm}/>) : (<></>) }
        { hasFishForm ? (<FishForm toggle={hasFishForm} setHasFishForm={setHasFishForm}/>) : (<></>) }  
        <h2> Fishing Log</h2>
        <NewCatchForm place={props}></NewCatchForm>
        <select id="fishTypes" >
        <option> Choose a Fish </option>
            { 
                fishTypes.map( (fish,i) => {
                    return <option key={i} value={fish.name}> {fish.name} </option>
                })
            }
        </select>
        <select id="baitTypes">
        <option> Choose a Bait</option>
            {
                baitTypes.map( (bait,i) => {
                    return <option key={i} value={bait.name}> {bait.name} </option>
                })
            }
        </select>
        <button className="" onClick={getFishTypes}> Submit Catch </button>

        </>
    )

}


export default FishingSite