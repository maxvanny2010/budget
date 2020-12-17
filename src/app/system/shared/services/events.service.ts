import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WFMEvent} from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  add(event: WFMEvent): Observable<WFMEvent> {
    return this.post('events', event);
  }

  getAll(): Observable<WFMEvent[]> {
    return this.get('events');
  }

  getById(id: string): Observable<WFMEvent> {
    return this.get(`events/${id}`);
  }
}
