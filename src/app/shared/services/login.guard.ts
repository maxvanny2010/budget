import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggIn()) {
      this.router.navigate(['/system/bill'], {
        queryParams:
          {authenticated: true}
      }).then(() => {
      });
    }
    return true;
  }
}
