import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDecisao, getDecisaoIdentifier } from '../decisao.model';

export type EntityResponseType = HttpResponse<IDecisao>;
export type EntityArrayResponseType = HttpResponse<IDecisao[]>;

@Injectable({ providedIn: 'root' })
export class DecisaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/decisaos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(decisao: IDecisao): Observable<EntityResponseType> {
    return this.http.post<IDecisao>(this.resourceUrl, decisao, { observe: 'response' });
  }

  update(decisao: IDecisao): Observable<EntityResponseType> {
    return this.http.put<IDecisao>(`${this.resourceUrl}/${getDecisaoIdentifier(decisao) as number}`, decisao, { observe: 'response' });
  }

  partialUpdate(decisao: IDecisao): Observable<EntityResponseType> {
    return this.http.patch<IDecisao>(`${this.resourceUrl}/${getDecisaoIdentifier(decisao) as number}`, decisao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDecisao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByReuniaoId(id: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDecisao[]>(`${this.resourceUrl}/reuniao/${id}`, { params: options, observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDecisao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDecisaoToCollectionIfMissing(decisaoCollection: IDecisao[], ...decisaosToCheck: (IDecisao | null | undefined)[]): IDecisao[] {
    const decisaos: IDecisao[] = decisaosToCheck.filter(isPresent);
    if (decisaos.length > 0) {
      const decisaoCollectionIdentifiers = decisaoCollection.map(decisaoItem => getDecisaoIdentifier(decisaoItem)!);
      const decisaosToAdd = decisaos.filter(decisaoItem => {
        const decisaoIdentifier = getDecisaoIdentifier(decisaoItem);
        if (decisaoIdentifier == null || decisaoCollectionIdentifiers.includes(decisaoIdentifier)) {
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
