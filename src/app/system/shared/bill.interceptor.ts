import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class BillInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone();
    /*console.log(req);*/
    return next.handle(req).pipe(
     /* tap(event => console.log(event))*/
    );
  }
}
