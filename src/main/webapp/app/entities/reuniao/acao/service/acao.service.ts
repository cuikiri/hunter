import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAcao, NewAcao } from '../acao.model';

export type PartialUpdateAcao = Partial<IAcao> & Pick<IAcao, 'id'>;

export type EntityResponseType = HttpResponse<IAcao>;
export type EntityArrayResponseType = HttpResponse<IAcao[]>;

@Injectable({ providedIn: 'root' })
export class AcaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/acaos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(acao: NewAcao): Observable<EntityResponseType> {
    return this.http.post<IAcao>(this.resourceUrl, acao, { observe: 'response' });
  }

  update(acao: IAcao): Observable<EntityResponseType> {
    return this.http.put<IAcao>(`${this.resourceUrl}/${this.getAcaoIdentifier(acao)}`, acao, { observe: 'response' });
  }

  partialUpdate(acao: PartialUpdateAcao): Observable<EntityResponseType> {
    return this.http.patch<IAcao>(`${this.resourceUrl}/${this.getAcaoIdentifier(acao)}`, acao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAcao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAcao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAcaoIdentifier(acao: Pick<IAcao, 'id'>): number {
    return acao.id;
  }

  compareAcao(o1: Pick<IAcao, 'id'> | null, o2: Pick<IAcao, 'id'> | null): boolean {
    return o1 && o2 ? this.getAcaoIdentifier(o1) === this.getAcaoIdentifier(o2) : o1 === o2;
  }

  addAcaoToCollectionIfMissing<Type extends Pick<IAcao, 'id'>>(
    acaoCollection: Type[],
    ...acaosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const acaos: Type[] = acaosToCheck.filter(isPresent);
    if (acaos.length > 0) {
      const acaoCollectionIdentifiers = acaoCollection.map(acaoItem => this.getAcaoIdentifier(acaoItem)!);
      const acaosToAdd = acaos.filter(acaoItem => {
        const acaoIdentifier = this.getAcaoIdentifier(acaoItem);
        if (acaoCollectionIdentifiers.includes(acaoIdentifier)) {
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
