import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVotoNaoDecisao, NewVotoNaoDecisao } from '../voto-nao-decisao.model';

export type PartialUpdateVotoNaoDecisao = Partial<IVotoNaoDecisao> & Pick<IVotoNaoDecisao, 'id'>;

export type EntityResponseType = HttpResponse<IVotoNaoDecisao>;
export type EntityArrayResponseType = HttpResponse<IVotoNaoDecisao[]>;

@Injectable({ providedIn: 'root' })
export class VotoNaoDecisaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/voto-nao-decisaos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(votoNaoDecisao: NewVotoNaoDecisao): Observable<EntityResponseType> {
    return this.http.post<IVotoNaoDecisao>(this.resourceUrl, votoNaoDecisao, { observe: 'response' });
  }

  update(votoNaoDecisao: IVotoNaoDecisao): Observable<EntityResponseType> {
    return this.http.put<IVotoNaoDecisao>(`${this.resourceUrl}/${this.getVotoNaoDecisaoIdentifier(votoNaoDecisao)}`, votoNaoDecisao, {
      observe: 'response',
    });
  }

  partialUpdate(votoNaoDecisao: PartialUpdateVotoNaoDecisao): Observable<EntityResponseType> {
    return this.http.patch<IVotoNaoDecisao>(`${this.resourceUrl}/${this.getVotoNaoDecisaoIdentifier(votoNaoDecisao)}`, votoNaoDecisao, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVotoNaoDecisao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVotoNaoDecisao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getVotoNaoDecisaoIdentifier(votoNaoDecisao: Pick<IVotoNaoDecisao, 'id'>): number {
    return votoNaoDecisao.id;
  }

  compareVotoNaoDecisao(o1: Pick<IVotoNaoDecisao, 'id'> | null, o2: Pick<IVotoNaoDecisao, 'id'> | null): boolean {
    return o1 && o2 ? this.getVotoNaoDecisaoIdentifier(o1) === this.getVotoNaoDecisaoIdentifier(o2) : o1 === o2;
  }

  addVotoNaoDecisaoToCollectionIfMissing<Type extends Pick<IVotoNaoDecisao, 'id'>>(
    votoNaoDecisaoCollection: Type[],
    ...votoNaoDecisaosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const votoNaoDecisaos: Type[] = votoNaoDecisaosToCheck.filter(isPresent);
    if (votoNaoDecisaos.length > 0) {
      const votoNaoDecisaoCollectionIdentifiers = votoNaoDecisaoCollection.map(
        votoNaoDecisaoItem => this.getVotoNaoDecisaoIdentifier(votoNaoDecisaoItem)!
      );
      const votoNaoDecisaosToAdd = votoNaoDecisaos.filter(votoNaoDecisaoItem => {
        const votoNaoDecisaoIdentifier = this.getVotoNaoDecisaoIdentifier(votoNaoDecisaoItem);
        if (votoNaoDecisaoCollectionIdentifiers.includes(votoNaoDecisaoIdentifier)) {
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
