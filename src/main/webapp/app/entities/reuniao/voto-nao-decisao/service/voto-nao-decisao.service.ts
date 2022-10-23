import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVotoNaoDecisao, getVotoNaoDecisaoIdentifier } from '../voto-nao-decisao.model';

export type EntityResponseType = HttpResponse<IVotoNaoDecisao>;
export type EntityArrayResponseType = HttpResponse<IVotoNaoDecisao[]>;

@Injectable({ providedIn: 'root' })
export class VotoNaoDecisaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/voto-nao-decisaos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(votoNaoDecisao: IVotoNaoDecisao): Observable<EntityResponseType> {
    return this.http.post<IVotoNaoDecisao>(this.resourceUrl, votoNaoDecisao, { observe: 'response' });
  }

  update(votoNaoDecisao: IVotoNaoDecisao): Observable<EntityResponseType> {
    return this.http.put<IVotoNaoDecisao>(`${this.resourceUrl}/${getVotoNaoDecisaoIdentifier(votoNaoDecisao) as number}`, votoNaoDecisao, {
      observe: 'response',
    });
  }

  partialUpdate(votoNaoDecisao: IVotoNaoDecisao): Observable<EntityResponseType> {
    return this.http.patch<IVotoNaoDecisao>(
      `${this.resourceUrl}/${getVotoNaoDecisaoIdentifier(votoNaoDecisao) as number}`,
      votoNaoDecisao,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVotoNaoDecisao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByDecicaoId(id: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVotoNaoDecisao[]>(`${this.resourceUrl}/decisao/${id}`, { params: options, observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVotoNaoDecisao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addVotoNaoDecisaoToCollectionIfMissing(
    votoNaoDecisaoCollection: IVotoNaoDecisao[],
    ...votoNaoDecisaosToCheck: (IVotoNaoDecisao | null | undefined)[]
  ): IVotoNaoDecisao[] {
    const votoNaoDecisaos: IVotoNaoDecisao[] = votoNaoDecisaosToCheck.filter(isPresent);
    if (votoNaoDecisaos.length > 0) {
      const votoNaoDecisaoCollectionIdentifiers = votoNaoDecisaoCollection.map(
        votoNaoDecisaoItem => getVotoNaoDecisaoIdentifier(votoNaoDecisaoItem)!
      );
      const votoNaoDecisaosToAdd = votoNaoDecisaos.filter(votoNaoDecisaoItem => {
        const votoNaoDecisaoIdentifier = getVotoNaoDecisaoIdentifier(votoNaoDecisaoItem);
        if (votoNaoDecisaoIdentifier == null || votoNaoDecisaoCollectionIdentifiers.includes(votoNaoDecisaoIdentifier)) {
          return false;
        }
        votoNaoDecisaoCollectionIdentifiers.push(votoNaoDecisaoIdentifier);
        return true;
      });
      return [...votoNaoDecisaosToAdd, ...votoNaoDecisaoCollection];
    }
    return votoNaoDecisaoCollection;
  }
}
