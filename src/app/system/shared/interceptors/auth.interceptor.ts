import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {AuthFbService} from '../../../shared/services/authfb.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthFbService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setParams: {auth: this.auth.token}
      });
    }
    return next.handle(req)
      .pipe(
        tap(() => {
          /* console.log('INTERCEPT');*/
        }),
        catchError((err: HttpErrorResponse) => {
          console.log('[INTERCEPTOR ERROR]: ', err);
          if (err.status === 401) {
            this.auth.logout();
            this.router.navigate(['/login'], {
              queryParams: {authenticated: false}
            }).then(() => {
            });
          }
          return throwError(err);
        })
      );
  }
}
