import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVotoSimDecisao, getVotoSimDecisaoIdentifier } from '../voto-sim-decisao.model';

export type EntityResponseType = HttpResponse<IVotoSimDecisao>;
export type EntityArrayResponseType = HttpResponse<IVotoSimDecisao[]>;

@Injectable({ providedIn: 'root' })
export class VotoSimDecisaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/voto-sim-decisaos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(votoSimDecisao: IVotoSimDecisao): Observable<EntityResponseType> {
    return this.http.post<IVotoSimDecisao>(this.resourceUrl, votoSimDecisao, { observe: 'response' });
  }

  update(votoSimDecisao: IVotoSimDecisao): Observable<EntityResponseType> {
    return this.http.put<IVotoSimDecisao>(`${this.resourceUrl}/${getVotoSimDecisaoIdentifier(votoSimDecisao) as number}`, votoSimDecisao, {
      observe: 'response',
    });
  }

  partialUpdate(votoSimDecisao: IVotoSimDecisao): Observable<EntityResponseType> {
    return this.http.patch<IVotoSimDecisao>(
      `${this.resourceUrl}/${getVotoSimDecisaoIdentifier(votoSimDecisao) as number}`,
      votoSimDecisao,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVotoSimDecisao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByDecicaoId(id: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVotoSimDecisao[]>(`${this.resourceUrl}/decisao/${id}`, { params: options, observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVotoSimDecisao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addVotoSimDecisaoToCollectionIfMissing(
    votoSimDecisaoCollection: IVotoSimDecisao[],
    ...votoSimDecisaosToCheck: (IVotoSimDecisao | null | undefined)[]
  ): IVotoSimDecisao[] {
    const votoSimDecisaos: IVotoSimDecisao[] = votoSimDecisaosToCheck.filter(isPresent);
    if (votoSimDecisaos.length > 0) {
      const votoSimDecisaoCollectionIdentifiers = votoSimDecisaoCollection.map(
        votoSimDecisaoItem => getVotoSimDecisaoIdentifier(votoSimDecisaoItem)!
      );
      const votoSimDecisaosToAdd = votoSimDecisaos.filter(votoSimDecisaoItem => {
        const votoSimDecisaoIdentifier = getVotoSimDecisaoIdentifier(votoSimDecisaoItem);
        if (votoSimDecisaoIdentifier == null || votoSimDecisaoCollectionIdentifiers.includes(votoSimDecisaoIdentifier)) {
          return false;
        }
        votoSimDecisaoCollectionIdentifiers.push(votoSimDecisaoIdentifier);
        return true;
      });
      return [...votoSimDecisaosToAdd, ...votoSimDecisaoCollection];
    }
    return votoSimDecisaoCollection;
  }
}
