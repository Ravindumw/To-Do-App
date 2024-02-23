import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  template: `
    <div class="h-screen flex justify-center items-center">
        <div class="flex flex-col gap-2">
            <div class="text-center font-bold bg-gradient-to-t from-lime-500
            to-sky-500 bg-clip-text text-transparent">
                <span class="material-symbols-outlined text-6xl pr-2 font-bold">
                task_alt
                </span>
              <h1 class="flex justify-center items-center text-3xl
            font-bold bg-gradient-to-r from-lime-600
            to-sky-500 bg-clip-text text-transparent">
                To-do app</h1>
            </div>
            <div class="text-slate-300">
              Please sign in with your Google to continue
            </div>
            <div class="text-center mt-2">
              <button (click)="authService.signIn()" class="text-slate-200 border border-slate-400
                rounded-md px-2 py-1 inline-flex items-center
                active:border-sky-800
                hover:border-sky-600 hover:shadow-md hover:shadow-cyan-900">
                <span class="font-bold pr-1 text-2xl text-cyan-500">G</span> Sign in with Google
              </button>
            </div>
        </div>
    </div>
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(public authService: AuthService, private title: Title) {
    title.setTitle("Login: To-do App");
  }

}
