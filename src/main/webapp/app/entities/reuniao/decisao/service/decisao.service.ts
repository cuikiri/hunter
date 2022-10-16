import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDecisao, NewDecisao } from '../decisao.model';

export type PartialUpdateDecisao = Partial<IDecisao> & Pick<IDecisao, 'id'>;

export type EntityResponseType = HttpResponse<IDecisao>;
export type EntityArrayResponseType = HttpResponse<IDecisao[]>;

@Injectable({ providedIn: 'root' })
export class DecisaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/decisaos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(decisao: NewDecisao): Observable<EntityResponseType> {
    return this.http.post<IDecisao>(this.resourceUrl, decisao, { observe: 'response' });
  }

  update(decisao: IDecisao): Observable<EntityResponseType> {
    return this.http.put<IDecisao>(`${this.resourceUrl}/${this.getDecisaoIdentifier(decisao)}`, decisao, { observe: 'response' });
  }

  partialUpdate(decisao: PartialUpdateDecisao): Observable<EntityResponseType> {
    return this.http.patch<IDecisao>(`${this.resourceUrl}/${this.getDecisaoIdentifier(decisao)}`, decisao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDecisao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDecisao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDecisaoIdentifier(decisao: Pick<IDecisao, 'id'>): number {
    return decisao.id;
  }

  compareDecisao(o1: Pick<IDecisao, 'id'> | null, o2: Pick<IDecisao, 'id'> | null): boolean {
    return o1 && o2 ? this.getDecisaoIdentifier(o1) === this.getDecisaoIdentifier(o2) : o1 === o2;
  }

  addDecisaoToCollectionIfMissing<Type extends Pick<IDecisao, 'id'>>(
    decisaoCollection: Type[],
    ...decisaosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const decisaos: Type[] = decisaosToCheck.filter(isPresent);
    if (decisaos.length > 0) {
      const decisaoCollectionIdentifiers = decisaoCollection.map(decisaoItem => this.getDecisaoIdentifier(decisaoItem)!);
      const decisaosToAdd = decisaos.filter(decisaoItem => {
        const decisaoIdentifier = this.getDecisaoIdentifier(decisaoItem);
        if (decisaoCollectionIdentifiers.includes(decisaoIdentifier)) {
          return false;
        }
        decisaoCollectionIdentifiers.push(decisaoIdentifier);
        return true;
      });
      return [...decisaosToAdd, ...decisaoCollection];
    }
    return decisaoCollection;
  }
}
