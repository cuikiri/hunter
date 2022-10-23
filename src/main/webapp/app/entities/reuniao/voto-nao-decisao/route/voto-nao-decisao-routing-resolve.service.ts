import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVotoNaoDecisao, VotoNaoDecisao } from '../voto-nao-decisao.model';
import { VotoNaoDecisaoService } from '../service/voto-nao-decisao.service';

@Injectable({ providedIn: 'root' })
export class VotoNaoDecisaoRoutingResolveService implements Resolve<IVotoNaoDecisao> {
  constructor(protected service: VotoNaoDecisaoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVotoNaoDecisao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((votoNaoDecisao: HttpResponse<VotoNaoDecisao>) => {
          if (votoNaoDecisao.body) {
            return of(votoNaoDecisao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new VotoNaoDecisao());
  }
}
