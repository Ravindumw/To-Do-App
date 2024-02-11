import './Form.css';
import {useRef, useState} from "react";
import {useTaskDispatcher} from "../context/TaskContext.tsx";
import {TaskDto} from "../dto/TaskDto.ts";
import {saveTask} from "../service/task-service.tsx";
import {useUser} from "../context/UserContext.tsx";

export function Form() {

    const user = useUser();
    const [value, setValue] = useState("");
    const txtRef = useRef<HTMLInputElement>(null);
    const taskDispatcher = useTaskDispatcher();

    function handleSubmit (e: React.FormEvent){
        e.preventDefault();
        saveTask(new TaskDto(null,value,null, user?.email!))
            .then(task =>{
                taskDispatcher({type:'add', task});
                setValue("");
                txtRef.current!.focus();
            }).catch(err =>{
                alert(err);
        })
    }
    return (
        <form onSubmit={handleSubmit}
            className="d-flex gap-2 p-2 border-bottom">
            <input className="form-control"
            ref={txtRef}
            value={value}
            onChange={e=> setValue(e.target.value)}
            placeholder="Eg. Finish react to-do app"
            type="text"/>
            <button className="btn btn-primary">ADD</button>
        </form>
    );
};