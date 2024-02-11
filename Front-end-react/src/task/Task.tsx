import './Task.css';
import {useId} from "react";
import {TaskDto} from "../dto/TaskDto.ts";

export function Task({description}:TaskDto){
    const id = useId();

    return(
        <div>
            <input id={id}
                className="form-check-input"
                type="checkbox"/>
            <label className="form-check-label" htmlFor={id}>
                {description}
            </label>
        </div>
    );
}