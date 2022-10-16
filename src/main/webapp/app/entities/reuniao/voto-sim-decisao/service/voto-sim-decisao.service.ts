import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVotoSimDecisao, NewVotoSimDecisao } from '../voto-sim-decisao.model';

export type PartialUpdateVotoSimDecisao = Partial<IVotoSimDecisao> & Pick<IVotoSimDecisao, 'id'>;

export type EntityResponseType = HttpResponse<IVotoSimDecisao>;
export type EntityArrayResponseType = HttpResponse<IVotoSimDecisao[]>;

@Injectable({ providedIn: 'root' })
export class VotoSimDecisaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/voto-sim-decisaos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(votoSimDecisao: NewVotoSimDecisao): Observable<EntityResponseType> {
    return this.http.post<IVotoSimDecisao>(this.resourceUrl, votoSimDecisao, { observe: 'response' });
  }

  update(votoSimDecisao: IVotoSimDecisao): Observable<EntityResponseType> {
    return this.http.put<IVotoSimDecisao>(`${this.resourceUrl}/${this.getVotoSimDecisaoIdentifier(votoSimDecisao)}`, votoSimDecisao, {
      observe: 'response',
    });
  }

  partialUpdate(votoSimDecisao: PartialUpdateVotoSimDecisao): Observable<EntityResponseType> {
    return this.http.patch<IVotoSimDecisao>(`${this.resourceUrl}/${this.getVotoSimDecisaoIdentifier(votoSimDecisao)}`, votoSimDecisao, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVotoSimDecisao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVotoSimDecisao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getVotoSimDecisaoIdentifier(votoSimDecisao: Pick<IVotoSimDecisao, 'id'>): number {
    return votoSimDecisao.id;
  }

  compareVotoSimDecisao(o1: Pick<IVotoSimDecisao, 'id'> | null, o2: Pick<IVotoSimDecisao, 'id'> | null): boolean {
    return o1 && o2 ? this.getVotoSimDecisaoIdentifier(o1) === this.getVotoSimDecisaoIdentifier(o2) : o1 === o2;
  }

  addVotoSimDecisaoToCollectionIfMissing<Type extends Pick<IVotoSimDecisao, 'id'>>(
    votoSimDecisaoCollection: Type[],
    ...votoSimDecisaosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const votoSimDecisaos: Type[] = votoSimDecisaosToCheck.filter(isPresent);
    if (votoSimDecisaos.length > 0) {
      const votoSimDecisaoCollectionIdentifiers = votoSimDecisaoCollection.map(
        votoSimDecisaoItem => this.getVotoSimDecisaoIdentifier(votoSimDecisaoItem)!
      );
      const votoSimDecisaosToAdd = votoSimDecisaos.filter(votoSimDecisaoItem => {
        const votoSimDecisaoIdentifier = this.getVotoSimDecisaoIdentifier(votoSimDecisaoItem);
        if (votoSimDecisaoCollectionIdentifiers.includes(votoSimDecisaoIdentifier)) {
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
