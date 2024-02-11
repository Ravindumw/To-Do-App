import './App.css'
import {useEffect, useState} from "react";
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from "./firebase.ts";
import {useUser, useUserDispatcher} from "./context/UserContext.tsx";
import {SignIn} from "./signin/SignIn.tsx";
import {Loader} from "./loader/Loader.tsx";
import {Header} from "./header/Header.tsx";
import {Form} from "./form/Form.tsx";
import {useTaskDispatcher, useTaskList} from "./context/TaskContext.tsx";
import {getAllTasks} from "./service/task-service.tsx";

function App() {
    const [loader, setLoader] = useState(true);
    const user = useUser();
    const userDispatcher = useUserDispatcher();
    const taskList = useTaskList();
    const taskDispatcher = useTaskDispatcher();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setLoader(false);
            if (user) {
                userDispatcher({type: 'sign-in', user});
                getAllTasks(user.email!).then(taskList =>{
                    taskDispatcher({type:'set-list', taskList});
                });
            } else {
                userDispatcher({type: 'sign-out'});
                taskDispatcher({type:'set-list',taskList: []});
            }
        });
    }, []);

    return (
        <>
            {loader?
                <Loader/>
                :
            user ?
                (<>
                    <Header/>
                    <Form/>
                    <div>
                        {taskList.map(task =>
                        <h1>{task.description}</h1>
                        )}
                    </div>
                </>)
                :
                <SignIn/>
            }
        </>
  )
}

export default App
