import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDecisao } from '../decisao.model';
import { DecisaoService } from '../service/decisao.service';

@Injectable({ providedIn: 'root' })
export class DecisaoRoutingResolveService implements Resolve<IDecisao | null> {
  constructor(protected service: DecisaoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDecisao | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((decisao: HttpResponse<IDecisao>) => {
          if (decisao.body) {
            return of(decisao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
