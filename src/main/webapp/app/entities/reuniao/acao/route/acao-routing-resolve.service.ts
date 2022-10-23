import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAcao, Acao } from '../acao.model';
import { AcaoService } from '../service/acao.service';

@Injectable({ providedIn: 'root' })
export class AcaoRoutingResolveService implements Resolve<IAcao> {
  constructor(protected service: AcaoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAcao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((acao: HttpResponse<Acao>) => {
          if (acao.body) {
            return of(acao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Acao());
  }
}
