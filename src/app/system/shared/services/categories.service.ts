import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category';
import {Observable} from 'rxjs';

@Injectable()
export class CategoriesService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  add(category: Category): Observable<Category> {
    return this.post('categories', category);
  }

  update(category: Category, id: number): Observable<Category> {
    return this.put(`categories/${id}`, category);
  }

  obtain(): Observable<Category[]> {
    return this.get('categories');
  }

  erase(id: number): Observable<[]> {
    return this.delete(`categories/${id}`);
  }
}
