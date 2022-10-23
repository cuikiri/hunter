import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { IDecisao, Decisao } from '../../decisao/decisao.model';

@Injectable({ providedIn: 'root' })
export class VotoSimRoutingResolveDecisaoService implements Resolve<IDecisao> {
  constructor(protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDecisao> | Observable<never> {
    const id = route.params['idDecisao'];
    if (id) {
      const decisao = new Decisao();
      decisao.id = id;
      return of(decisao);
    }
    return of(new Decisao());
  }
}
