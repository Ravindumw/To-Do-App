import './SignIn.css'
import {auth} from "../firebase.ts";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
export function SignIn() {

    function handleSignIn(){
        signInWithPopup(auth, new GoogleAuthProvider());
    }


    return (
        <>
            <div className="d-flex vh-100 flex-column gap-2
            align-items-center justify-content-center">
                <h1>Welcome to To-do App</h1>
                <button onClick={handleSignIn} className="btn btn-primary">
                    Sign in with Google
                </button>
            </div>
        </>
    );
};