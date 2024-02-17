import { Component } from '@angular/core';

@Component({
  selector: 'app-task-list',
  template: `
    <main class="flex flex-col gap-2 ">
      @for(task of nums; track $index) {
            <app-task />
      }
    </main>
  `,
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  nums = new Array(100);
}
