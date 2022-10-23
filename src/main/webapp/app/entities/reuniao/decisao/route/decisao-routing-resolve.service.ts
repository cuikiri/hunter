import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDecisao, Decisao } from '../decisao.model';
import { DecisaoService } from '../service/decisao.service';

@Injectable({ providedIn: 'root' })
export class DecisaoRoutingResolveService implements Resolve<IDecisao> {
  constructor(protected service: DecisaoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDecisao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((decisao: HttpResponse<Decisao>) => {
          if (decisao.body) {
            return of(decisao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Decisao());
  }
}
