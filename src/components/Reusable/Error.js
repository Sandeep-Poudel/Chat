
function Error({ error }) {
    if(error==="Firebase: Error (auth/invalid-email)."){
        error="Invalid Email"
    }
    if(error==="Firebase: Error (auth/wrong-password)."){
        error="Wrong Password"
    }
    if(error==="Firebase: Error (auth/user-not-found)."){
        error="User not found"
    }
    if(error==="Firebase: Error (auth/email-already-in-use)."){
        error="Email already in use"
    }
    if(error==="Firebase: Error (auth/weak-password)."){
        error="Weak Password"
    }
    if(error==="Firebase: Error (auth/invalid-credential)."){
        error="Invalid Credential"
    }
    return (
        error &&
        <div className="text-white text-sm p-1 my-2 font-bold  bg-red-400  rounded justify-center flex items-center">
            {error}
        </div>
    )

}

export default Error;