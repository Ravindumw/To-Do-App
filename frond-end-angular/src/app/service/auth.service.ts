import { Injectable } from '@angular/core';
import {Auth, User, authState,GoogleAuthProvider, user, signInWithPopup} from "@angular/fire/auth";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class AuthService {
  private initialized = false;
  private userSubject = new BehaviorSubject<User | null | undefined>(undefined);
  constructor(private auth: Auth) {
    authState(auth).subscribe(user =>{
        this.initialized = true;
        this.userSubject.next(user);
     });
  }

  signIn(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  isInitialized(){
    return this.initialized;
  }

  getPrinciple(){
    return this.userSubject.asObservable();
  }
}
