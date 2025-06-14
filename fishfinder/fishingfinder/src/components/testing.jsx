import react  from "react";
import { useState } from "react";


export const TestDbButton = () => {
    const [records, setRecords] = useState([]);

    const testFetch = () => {
    fetch(process.env.REACT_APP_BASE_URL + "test-db/", {
        
    })
    .then(response => { 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        return response.json()})
    .then(data => setRecords(data));
    }


    const insertRecord = () => {
        fetch(process.env.REACT_APP_BASE_URL+ "test-db/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                column1: 6,  
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Record inserted:", data);
        })
        .catch(error => {
            console.error("Insert error:", error);
        });
    }
    

    return(
        <div>
            <button onClick={insertRecord}> TEST </button>
            {records.map(record =>(
                    <div key={record.id}> {record.column1} </div>
                ))}
        </div>
    );
}