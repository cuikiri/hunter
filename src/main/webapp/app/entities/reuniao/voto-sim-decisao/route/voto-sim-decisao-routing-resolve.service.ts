import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVotoSimDecisao } from '../voto-sim-decisao.model';
import { VotoSimDecisaoService } from '../service/voto-sim-decisao.service';

@Injectable({ providedIn: 'root' })
export class VotoSimDecisaoRoutingResolveService implements Resolve<IVotoSimDecisao | null> {
  constructor(protected service: VotoSimDecisaoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVotoSimDecisao | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((votoSimDecisao: HttpResponse<IVotoSimDecisao>) => {
          if (votoSimDecisao.body) {
            return of(votoSimDecisao.body);
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
