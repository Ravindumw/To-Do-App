import {Component, Inject, Input} from '@angular/core';
import {TaskDTO} from "../../dto/taskDTO";
import {single} from "rxjs";
import {SpringTaskService} from "../../service/spring-task.service";
import {TaskService} from "../../service/task-service";

@Component({
  selector: 'app-task',
  template: `
    <div class="flex flex-row items-center justify-between gap-2 hover:bg-gradient-to-r from-transparent via-sky-500 to-transparent p-2">
      <div class="animate__animated animate__fadeInUp animate__faster flex flex-row gap-2 items-center">
        <input (change)="onChange()" id="chk-{{task.id}}" class="w-5 h-5 ml-2 bg-slate-700 rounded text-green-600 focus:shadow-none
        focus:shadow-sky-700 focus:right-offset-0 focus:right-0
        peer"
               [checked]="task.status"
        type="checkbox">
        <label class="select-none peer-checked:line-through peer-checked:text-gray-400 peer-checked:decoration-lime-500
         peer-checked:decoration-2 text-slate-300 cursor-pointer"
               for="chk-{{task.id}}">
            {{task.description}}
        </label>
      </div>
      <div (click)="onDeleteClick()" title="Delete"
           class="select-none flex mr-2 items-center rounded-full p-0.5 group cursor-pointer">
        <span class="material-symbols-outlined text-gray-400 group-hover:text-amber-500">
            close
        </span>
      </div>
    </div>
  `,
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input()
  task!: TaskDTO;

  constructor(@Inject(TaskService) private taskService: TaskService) {

  }

  onDeleteClick (){
    this.taskService.deleteTask(this.task);
  }

  onChange(){
    this.taskService.updateTask(this.task);
  }
}
