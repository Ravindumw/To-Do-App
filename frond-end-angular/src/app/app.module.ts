import {importProvidersFrom, InjectionToken, NgModule, Optional} from '@angular/core';
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
import {SpringTaskService} from "./service/spring-task.service";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors
} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {errorInterceptor} from "./interceptor/error.interceptor";
import {CloudStoreTaskService} from "./service/cloud-store-task.service";
import {TaskService} from "./service/task-service";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {RoutingModule} from "./routing.module";


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
    RoutingModule,
    provideFirebaseApp(() => initializeApp({
      "projectId": "to-do-app-angular-522df",
      "appId": "1:1028753500772:web:52ddafaf7ecb9abde08d71",
      "storageBucket": "to-do-app-angular-522df.appspot.com",
      "apiKey": "AIzaSyDfP7ELJ4d1pnRtPc0KAJsbWOZDZnJNGQw",
      "authDomain": "to-do-app-angular-522df.firebaseapp.com",
      "messagingSenderId": "1028753500772"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(()=> getFirestore()),
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      enableHtml: true,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      progressBar: true,
      timeOut: 1500
    })
  ],
  providers: [AuthService,
    {provide: TaskService, useClass: CloudStoreTaskService},
    provideHttpClient(withInterceptors([errorInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule {

}
