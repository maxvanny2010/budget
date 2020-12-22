import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {FbAuthResponse, User} from '../interfaces/interface';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class AuthFbService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  private static setToken(response: FbAuthResponse | null): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 100);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      user).pipe(tap(AuthFbService.setToken),
      catchError(this.handleError.bind(this)));
  }

  registration(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
      user).pipe(catchError(this.handleError.bind(this)));
  }

  logout(): void {
    AuthFbService.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const {message} = error.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Не зарегистрованный адрес');
        break;
      case  'INVALID_PASSWORD':
        this.error$.next('Неправильный пароль');
        break;
      case  'INVALID_EMAIL':
        this.error$.next('Неправильный почтовый адрес');
        break;
      case  'EMAIL_EXISTS':
        this.error$.next('Пароль существует');
        break;
      case  'TOO_MANY_ATTEMPTS_TRY_LATER':
        this.error$.next('Повторите через 5 минут');
        break;
    }
    return throwError(error);
  }
}
