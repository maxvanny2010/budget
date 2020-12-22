import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApi} from '../core/base-api';
import {map} from 'rxjs/operators';
import {Users} from '../interfaces/interface';

@Injectable()
export class UserService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<Users> {
    return this.get(`users.json?email=${email}`)
      .pipe(map((response: { [key: string]: any }) => {
        const users = Object.keys(response).map(key => ({...response[key]}));
        return users[0];
      }));
  }

  create(user: Users): Observable<Users> {
    return this.post('users.json', user);
  }
}
