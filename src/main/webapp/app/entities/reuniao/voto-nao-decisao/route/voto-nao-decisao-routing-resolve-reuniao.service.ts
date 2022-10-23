import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { IReuniao, Reuniao } from '../../reuniao/reuniao.model';

@Injectable({ providedIn: 'root' })
export class VotoNaoRoutingResolveReuniaoService implements Resolve<IReuniao> {
  constructor(protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReuniao> | Observable<never> {
    const id = route.params['idReuniao'];
    if (id) {
      const decisao = new Reuniao();
      decisao.id = id;
      return of(decisao);
    }
    return of(new Reuniao());
  }
}
