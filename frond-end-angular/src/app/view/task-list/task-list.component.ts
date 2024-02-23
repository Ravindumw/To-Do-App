import {Component, Inject} from '@angular/core';
import {SpringTaskService} from "../../service/spring-task.service";
import {TaskDTO} from "../../dto/taskDTO";
import {animate, query, style, transition, trigger} from "@angular/animations";
import {TaskService} from "../../service/task-service";

@Component({
  selector: 'app-task-list',
  template: `
    <main class="flex flex-col gap-2 ">
      @if (taskService.isInitialized()){
          @for (task of taskService.getAllTasks(); track task.id) {
          <app-task @task [task]="task"/>
          } @empty{
          <div class="text-center text-slate-400 mt-2 animate__animated animate__fadeIn animate__delay-1s">No Tasks Yet!</div>
          }
      }@else {
        <div class="flex justify-center items-center w-full fixed top-0 -z-50">
               <app-loader />
        </div>
      }
    </main>
  `,
  styleUrl: './task-list.component.scss',
  animations:[
    trigger('task',[
      transition(":leave",[
        query('div>div: last-child', style({display: 'none'})),
        animate(350 , style({transform: 'translateX(-100%)'}))])
    ])
  ]
})
export class TaskListComponent {
  task : any;
  constructor(@Inject(TaskService) public taskService: TaskService) {
  }
}
