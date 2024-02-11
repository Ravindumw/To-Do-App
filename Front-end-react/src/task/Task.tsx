import './Task.css';
import React, {useId, useState} from "react";
import {TaskDto} from "../dto/TaskDto.ts";
import {useTaskDispatcher} from "../context/TaskContext.tsx";
import {deleteTask, updateTask} from "../service/task-service.tsx";

export function Task(task:TaskDto){
    const id = useId();
    const [checked, setChecked] = useState(task.status);
    const taskDispatcher = useTaskDispatcher();

    function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
        updateTask(task).then(val => {
            taskDispatcher({
                type: 'update',
                task
            });
            setChecked(!checked);
        }).catch(err => {
            alert("Failed to update the task");
        })
    }

    function handleDelete(){
        deleteTask(task.id!).then(val => {
            taskDispatcher({
                type: 'delete',
                id: task.id
            })
        }).catch(err => {
            alert("Failed to delete the task");
        });
    }

    return(
        <div className="Task d-flex justify-content-between
                        align-items-center p-2">
            <div className="d-flex gap-2">
                <input checked={checked ?? false}
                    onChange={handleCheck}
                    id={id}
                    className="form-check-input"
                    type="checkbox"/>
                <label className="form-check-label" htmlFor={id}>
                    {task.description}
                </label>
            </div>
            <i onClick={handleDelete} className="bi bi-trash fs-4"></i>
        </div>
    );
}