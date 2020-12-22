import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthFbService} from './authfb.service';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthFbService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/system/bill'], {
        queryParams:
          {authenticated: true}
      }).then(() => {
      });
    }
    return true;
  }
}
