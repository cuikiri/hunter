import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPauta } from '../pauta.model';
import { PautaService } from '../service/pauta.service';

@Injectable({ providedIn: 'root' })
export class PautaRoutingResolveService implements Resolve<IPauta | null> {
  constructor(protected service: PautaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPauta | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pauta: HttpResponse<IPauta>) => {
          if (pauta.body) {
            return of(pauta.body);
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
