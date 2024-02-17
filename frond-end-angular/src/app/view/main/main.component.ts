import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <app-header />
    <app-from />
    <app-task-list />
  `,
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
