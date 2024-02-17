import {NgModule, Optional} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './view/main/main.component';
import { HeaderComponent } from './view/header/header.component';
import { FromComponent } from './view/from/from.component';
import { TaskListComponent } from './view/task-list/task-list.component';
import { TaskComponent } from './view/task/task.component';
import { LoginComponent } from './view/login/login.component';
import {Route, RouterModule, Routes} from "@angular/router";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {AuthService} from "./service/auth.service";
import {AuthGuard} from "@angular/fire/auth-guard";
import {authGuard} from "./guard/auth.guard";
import { LoaderComponent } from './view/loader/loader.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/app'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'app',
    component:MainComponent,
    canActivate: [authGuard]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FromComponent,
    TaskListComponent,
    TaskComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    provideFirebaseApp(() => initializeApp({"projectId":"to-do-app-angular-522df","appId":"1:1028753500772:web:52ddafaf7ecb9abde08d71","storageBucket":"to-do-app-angular-522df.appspot.com","apiKey":"AIzaSyDfP7ELJ4d1pnRtPc0KAJsbWOZDZnJNGQw","authDomain":"to-do-app-angular-522df.firebaseapp.com","messagingSenderId":"1028753500772"})),
    provideAuth(() => getAuth())
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
