import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class NameService {
  name: string;

  constructor() {
  }

  getNameStorage(): Observable<string> {
    return of(localStorage.getItem('fb-name'));
  }

  setNameStorage(name: string): void {
    localStorage.setItem('fb-name', name);
  }
}
