import {createContext, ReactNode, useContext, useReducer} from "react";
import {TaskDto} from "../dto/TaskDto.ts";
import {act} from "react-dom/test-utils";

type Action = {
    type: "add" | "delete" | "update" | "set-list",
    [property: string]: any
}

const TaskContext = createContext<TaskDto[]>([]);
const TaskDispatchContext = createContext<React.Dispatch<Action>>(()=>{});

function taskReducer(taskList: TaskDto[], action: Action){
    if(action.type === "add"){
        return [...taskList, action.task];
    }else if (action.type === "delete"){
        return taskList.filter(task => task.id !== task.id);
    }else if(action.type === "update"){
        const task = taskList.find(t => t.id == action.task.id)!;
        task.status = !task.status;
        return taskList;
    }else {
        return action.taskList;
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