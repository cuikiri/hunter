import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAcao, getAcaoIdentifier } from '../acao.model';

export type EntityResponseType = HttpResponse<IAcao>;
export type EntityArrayResponseType = HttpResponse<IAcao[]>;

@Injectable({ providedIn: 'root' })
export class AcaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/acaos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(acao: IAcao): Observable<EntityResponseType> {
    return this.http.post<IAcao>(this.resourceUrl, acao, { observe: 'response' });
  }

  update(acao: IAcao): Observable<EntityResponseType> {
    return this.http.put<IAcao>(`${this.resourceUrl}/${getAcaoIdentifier(acao) as number}`, acao, { observe: 'response' });
  }

  partialUpdate(acao: IAcao): Observable<EntityResponseType> {
    return this.http.patch<IAcao>(`${this.resourceUrl}/${getAcaoIdentifier(acao) as number}`, acao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAcao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByReuniaoId(id: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAcao[]>(`${this.resourceUrl}/reuniao/${id}`, { params: options, observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAcao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAcaoToCollectionIfMissing(acaoCollection: IAcao[], ...acaosToCheck: (IAcao | null | undefined)[]): IAcao[] {
    const acaos: IAcao[] = acaosToCheck.filter(isPresent);
    if (acaos.length > 0) {
      const acaoCollectionIdentifiers = acaoCollection.map(acaoItem => getAcaoIdentifier(acaoItem)!);
      const acaosToAdd = acaos.filter(acaoItem => {
        const acaoIdentifier = getAcaoIdentifier(acaoItem);
        if (acaoIdentifier == null || acaoCollectionIdentifiers.includes(acaoIdentifier)) {
          return false;
        }
        acaoCollectionIdentifiers.push(acaoIdentifier);
        return true;
      });
      return [...acaosToAdd, ...acaoCollection];
    }
    return acaoCollection;
  }
}
