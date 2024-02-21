import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {TaskDTO} from "../dto/taskDTO";
import {catchError, finalize, tap} from "rxjs";

@Injectable()
export class TaskService {
  private readonly API_BASE_URL = 'http://localhost:8080/api/v1/tasks';
  private taskList: Array<TaskDTO> = [];
  private initialized = false;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.http.get<Array<TaskDTO>>(`${this.API_BASE_URL}?email=${this.authService.getPrinciple()?.email}`)
      .pipe(finalize(() => this.initialized = true))
      .subscribe(taskList => this.taskList = taskList);
  }
  isInitialized(){
    return this.initialized;
  }

  getAllTasks(){
    return this.taskList;
  }
  deleteTask(task: TaskDTO){
    this.http.delete(`${this.API_BASE_URL}/${task.id}`)
      .subscribe(
        val => {
          const index = this.taskList.indexOf(task);
          this.taskList.splice(index, 1);
        });
  }
  createTask(description: string):Promise<void> {
    const taskDTO = new TaskDTO(null, description, null, this.authService.getPrinciple()!.email!);
    return new Promise<void>((resolve, reject) => {
      this.http.post<TaskDTO>(this.API_BASE_URL, taskDTO).subscribe({
        next: task => {
          this.taskList.push(task);
          resolve();
          },
        error: err => { reject()}
      });
    });
  }
  updateTask(task: TaskDTO){
    task.status = !task.status;
      this.http.patch(`${this.API_BASE_URL}/${task.id}`, {...task,id: null})
        .subscribe({
          error: err => {
            task.status = !task.status
          }
        });
  }
}
