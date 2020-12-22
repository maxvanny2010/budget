import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../interface/interface';
import {map} from 'rxjs/operators';
import {FbResponse} from '../../../shared/interfaces/interface';

@Injectable()
export class CategoriesService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  add(category: Category): Observable<Category> {
    return this.post('categories.json', category)
      .pipe(
        map((response: FbResponse) => {
          return {
            ...category,
            id: response.name
          };
        })
      );
  }

  create(): Observable<Category> {
    const category = {name: 'Дом', capacity: 0};
    return this.add(category);
  }

  update(category: Category, id: string): Observable<Category> {
    return this.put(`categories/${id}.json`, category)
      .pipe(map(() => {
        return {...category};
      }));
  }

  getAll(): Observable<Category[]> {
    return this.get('categories.json')
      .pipe(map((response: { [key: string]: any }) => {
          if (response === null) {
            return [];
          } else {
            return Object.keys(response).map(key => ({...response[key], id: key}));
          }
        }
      ));
  }

  getById(id: number): Observable<Category> {
    return this.get(`categories/${id}.json`).pipe(map((response: { [key: string]: any }) => {
      const categories = Object.keys(response).map(key => ({...response[key], id: key}));
      console.log(categories);
      return categories[0];
    }));
  }

  erase(id: string): Observable<Category> {
    return this.delete(`categories/${id}.json`);
  }
}
