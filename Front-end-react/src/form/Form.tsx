import './Form.css';
import {useRef, useState} from "react";

export const Form = () => {

    const [value, setValue] = useState("");
    const txtRef = useRef<HTMLInputElement>(null);

    function handleSubmit (e: React.FormEvent){
        e.preventDefault();
    // Todo: Create a new task
    // Todo: Add into the task list
        setValue("");
        txtRef.current!.focus();
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