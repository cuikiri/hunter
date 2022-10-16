import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IReuniao } from '../reuniao.model';
import { ReuniaoService } from '../service/reuniao.service';

@Injectable({ providedIn: 'root' })
export class ReuniaoRoutingResolveService implements Resolve<IReuniao | null> {
  constructor(protected service: ReuniaoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReuniao | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((reuniao: HttpResponse<IReuniao>) => {
          if (reuniao.body) {
            return of(reuniao.body);
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
