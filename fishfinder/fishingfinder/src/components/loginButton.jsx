import React from 'react';


export const Login = () => {

    function signInWithGoogle () {
      console.log("Working")
    }

    return(
        <button onClick={signInWithGoogle}> Login with Google </button>
    )
}