import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

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

  constructor(private title: Title) {
    title.setTitle("Home: To-do App");
  }
}
