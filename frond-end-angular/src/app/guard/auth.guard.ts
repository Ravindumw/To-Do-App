import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";
import {user} from "@angular/fire/auth";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

export const authGuard: CanActivateFn = (route, state) => {
  const routerService = inject(Router);
  const authService = inject(AuthService);
  if (authService.getPrinciple()){
    return true;
  }else {
    return routerService.createUrlTree(['/login']);
  }
};
