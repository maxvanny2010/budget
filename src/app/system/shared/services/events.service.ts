import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WFMEvent} from '../interface/interface';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class EventsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  add(event: WFMEvent): Observable<WFMEvent> {
    return this.post('events.json', event).pipe(
      map((response) => {
        return {
          ...response
        };
      })
    );
  }

  create(): Observable<WFMEvent> {
    const event = {
      type: 'NULL',
      amount: 0,
      category: 0,
      date: moment().date().toString(),
      description: ''
    };
    return this.add(event);
  }

  getAll(): Observable<WFMEvent[]> {
    return this.get('events.json').pipe(map((response: { [key: string]: any }) => {
        if (response === null) {
          return [];
        } else {
          return Object.keys(response).map(key => ({...response[key], id: key}));
        }
      }
    ));
  }

  getById(id: string): Observable<WFMEvent> {
    return this.get(`events/${id}.json`);
  }
}
