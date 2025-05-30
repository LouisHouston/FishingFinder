import react, { useState, useEffect } from "react";

//@ has to be a child of FishingSite because we use the data from the BoW selected
function NewCatchForm(props) {
    const [newCatchForm, setNewCatchForm] = useState({
        baitName: "",
        baitFresh: false,
        baitSalt: false,
        fishName: "",
        fishFresh: false,
        fishSalt: false,
        bow_name: props.place.name, // passed to this component as a prop
        user_id: null,
    })

    // On component mount
    useEffect( () =>{ 
        setNewCatchForm({...newCatchForm, user_id: localStorage.getItem('user.pk')})
        console.log("USERID HERE ", newCatchForm.user_id)
    },[])



return(
    <>
    <form>
        <label> Fish Type
        <input type="text" />
        </label>

        <label> Bait Type
            <input type="text" />
        </label>

        <button>
            Submit Form
        </button>
    </form>
    </>
)

}


export default NewCatchForm;