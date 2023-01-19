import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { IPeriodoDuracao, PeriodoDuracao } from '../../periodo-duracao/periodo-duracao.model';

@Injectable({ providedIn: 'root' })
export class DiaSemanaRoutingResolvePeriodoService implements Resolve<IPeriodoDuracao> {
  constructor(protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPeriodoDuracao> | Observable<never> {
    const id = route.params['idPeriodo'];
    if (id) {
      const periodo = new PeriodoDuracao();
      periodo.id = id;
      return of(periodo);
    }

    return of(new PeriodoDuracao());
  }
}
