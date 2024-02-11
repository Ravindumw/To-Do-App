import {createContext, ReactNode, useContext, useReducer} from "react";
import {TaskDto} from "../dto/TaskDto.ts";

type Action = {
    type: "add" | "delete" | "set-list",
    [property: string]: any
}

const TaskContext = createContext<TaskDto[]>([]);
const TaskDispatchContext = createContext<React.Dispatch<Action>>(()=>{});

function taskReducer(tasks: TaskDto[], {type, task, taskList}: Action){
    if(type === "add"){
        return [...tasks, task];
    }else if (type === "set-list"){
        return taskList;
    }else {
        return tasks.filter(task => task.id !== task.id);
    }
}

export function TaskProvider ({children}:{children: ReactNode}){
    const [taskList, taskDispatcher] = useReducer(taskReducer, []);

    return (<TaskContext.Provider value={taskList}>
        <TaskDispatchContext.Provider value={taskDispatcher}>
            {children}
        </TaskDispatchContext.Provider>
    </TaskContext.Provider> )
}

export function useTaskList(){
    return useContext(TaskContext);
}

export function useTaskDispatcher(){
    return useContext(TaskDispatchContext);
}