import './App.css'
import {useEffect} from "react";
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from "./firebase.ts";
import {useUser, useUserDispatcher} from "./context/UserContext.tsx";
import {SignIn} from "./signin/SignIn.tsx";

function App() {
    const user = useUser();
    const userDispatcher = useUserDispatcher();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                userDispatcher({type: 'sign-in', user})
            } else {
                userDispatcher({type: 'sign-out'})
            }
        });
    }, []);

    return (
        <>
            {user ? <h1>To-do App</h1> : <SignIn/>}
        </>
  )
}

export default App
