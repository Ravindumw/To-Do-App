import {TaskDto} from "../dto/TaskDto.ts";

const API_BASE_URL = 'http://localhost:8080/api/v1/tasks';

export async function getAllTasks(email: string){
    return await (await fetch(`${API_BASE_URL}?email=${email}`)).json();
}

export async function saveTask(task: TaskDto){
    return await (await fetch(API_BASE_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(task)
    })).json() as TaskDto;
}

export async function updateTask(task: TaskDto){
    const response = await fetch(API_BASE_URL,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(task)
    });
    if (!response.ok) throw new Error("Failed to update the task")

}

export async function deleteTask(taskId: number){
    const response = await fetch(`${API_BASE_URL}/${taskId}`,{
        method:"DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete the task")
}