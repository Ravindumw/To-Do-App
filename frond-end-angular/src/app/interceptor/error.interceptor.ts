import { HttpInterceptorFn } from '@angular/common/http';
import {catchError} from "rxjs";
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastrService);
  return next(req).pipe(
    catchError(err => {
      toastService.error('Something went wrong<br> Please try again!');
      throw err;
    })
  );
};
