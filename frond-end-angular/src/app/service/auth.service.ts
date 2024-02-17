import { Injectable } from '@angular/core';
import {Auth, User, authState, user, signInWithPopup} from "@angular/fire/auth";
import {BehaviorSubject} from "rxjs";
import firebase from "firebase/compat";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable()
export class AuthService {
  private initialized = false;
  private userSubject = new BehaviorSubject<User | null | undefined>(undefined);
  constructor(auth: Auth) {
    authState(auth).subscribe(user =>{
        this.initialized = true;
        this.userSubject.next(user);
     });
  }


  isInitialized(){
    return this.initialized;
  }

  getPrinciple(){
    return this.userSubject.asObservable();
  }
}
