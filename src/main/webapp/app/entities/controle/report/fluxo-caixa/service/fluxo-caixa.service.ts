import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IFiltroFluxoCaixa } from '../filtro-fluxo-caixa.model';

@Injectable({ providedIn: 'root' })
export class FluxoCaixaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fluxocaixa');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  print(filtro: IFiltroFluxoCaixa): Observable<HttpResponse<any>> {
    const copy = this.convertDateIncioFimFromClient(filtro);
    return this.http.post(`${this.resourceUrl}/report/periodo/jasper`, copy, { observe: 'response', responseType: 'blob' });
  }

  protected convertDateIncioFimFromClient(filtro: IFiltroFluxoCaixa): IFiltroFluxoCaixa {
    return Object.assign({}, filtro, {
      dataInicio: filtro.dataInicio?.isValid() ? filtro.dataInicio.format(DATE_FORMAT) : undefined,
      dataFim: filtro.dataFim?.isValid() ? filtro.dataFim.format(DATE_FORMAT) : undefined,
    });
  }
}
