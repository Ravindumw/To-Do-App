const API_BASE_URL = 'http://localhost:8080/api/v1/tasks';

export async function getAllTasks(email: string){
    return await (await fetch(`${API_BASE_URL}?email=${email}`)).json();
}