import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class BaseApi {
  private baseUrl = environment.fbDbUrl;

  constructor(public http: HttpClient) {
  }

  private getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }

  public get(url: string): Observable<any> {
    return this.http.get(this.getUrl(url));
  }

  public post(url: string, data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data);
  }

  public put(url: string, data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data);
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(this.getUrl(url));
  }
}
