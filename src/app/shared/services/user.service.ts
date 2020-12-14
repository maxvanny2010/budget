import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {BaseApi} from '../core/base-api';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`)
      .pipe(map((users) => {
        return users[0] ? users[0] : null;
      }));
  }

  create(user: User): Observable<User> {
    return this.post('user', user);
  }
}
