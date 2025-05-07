import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem("token");
    if(token != null) {
      const modifiedRequest = request.clone({
        setHeaders: {
          "Authorization": "Bearer " + token
        }
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(request).pipe(
      catchError(err => {
        if(err.status === 401 || err.status === 403) {
          this.router.navigateByUrl('/books');
        }
        return throwError(()=> err);
      })
    );
  }
}
