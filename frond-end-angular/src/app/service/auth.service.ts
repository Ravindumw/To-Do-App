import { Injectable } from '@angular/core';
import {Auth, User, authState, GoogleAuthProvider, user, signInWithPopup, signOut} from "@angular/fire/auth";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  private initialized = false;
  private user: User | null = null;
  constructor(private auth: Auth, private routerService: Router) {
    authState(auth).subscribe(user =>{
        this.initialized = true;
        this.user = user;
        if (user){
          this.routerService.navigateByUrl('/app');
        }else {
          this.routerService.navigateByUrl('/login')
        }
     });
  }

  signIn(){
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  isInitialized(){
    return this.initialized;
  }

  getPrinciple(){
    return this.user;
  }
  signOut(){
    signOut(this.auth);
  }
}
