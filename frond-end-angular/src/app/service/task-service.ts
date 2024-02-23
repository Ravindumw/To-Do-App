import {TaskDTO} from "../dto/taskDTO";

export abstract class TaskService {
  abstract isInitialized(): boolean;
  abstract getAllTasks(): Array<TaskDTO>;
  abstract deleteTask(task: TaskDTO): void;
  abstract createTask(description: string):Promise<void> ;
  abstract updateTask(task: TaskDTO): void;
}
