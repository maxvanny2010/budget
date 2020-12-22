import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../interface/interface';
import {BaseApi} from '../../../shared/core/base-api';
import {map} from 'rxjs/operators';

@Injectable()
export class BillService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  obtain(): Observable<Bill> {
    return this.get('bill.json')
      .pipe(map((response) => {
        return {...response};
      }));
  }

  update(bill: Bill): Observable<Bill> {
    return this.put(`bill.json`, bill);
  }

  getCurrency(base: string = 'RUB', ...symbols: string[]): Observable<any> {
    return this.http.get<any>(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbols}`);
  }

}
