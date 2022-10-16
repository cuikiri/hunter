import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPauta, NewPauta } from '../pauta.model';

export type PartialUpdatePauta = Partial<IPauta> & Pick<IPauta, 'id'>;

export type EntityResponseType = HttpResponse<IPauta>;
export type EntityArrayResponseType = HttpResponse<IPauta[]>;

@Injectable({ providedIn: 'root' })
export class PautaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pautas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pauta: NewPauta): Observable<EntityResponseType> {
    return this.http.post<IPauta>(this.resourceUrl, pauta, { observe: 'response' });
  }

  update(pauta: IPauta): Observable<EntityResponseType> {
    return this.http.put<IPauta>(`${this.resourceUrl}/${this.getPautaIdentifier(pauta)}`, pauta, { observe: 'response' });
  }

  partialUpdate(pauta: PartialUpdatePauta): Observable<EntityResponseType> {
    return this.http.patch<IPauta>(`${this.resourceUrl}/${this.getPautaIdentifier(pauta)}`, pauta, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPauta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPauta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPautaIdentifier(pauta: Pick<IPauta, 'id'>): number {
    return pauta.id;
  }

  comparePauta(o1: Pick<IPauta, 'id'> | null, o2: Pick<IPauta, 'id'> | null): boolean {
    return o1 && o2 ? this.getPautaIdentifier(o1) === this.getPautaIdentifier(o2) : o1 === o2;
  }

  addPautaToCollectionIfMissing<Type extends Pick<IPauta, 'id'>>(
    pautaCollection: Type[],
    ...pautasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const pautas: Type[] = pautasToCheck.filter(isPresent);
    if (pautas.length > 0) {
      const pautaCollectionIdentifiers = pautaCollection.map(pautaItem => this.getPautaIdentifier(pautaItem)!);
      const pautasToAdd = pautas.filter(pautaItem => {
        const pautaIdentifier = this.getPautaIdentifier(pautaItem);
        if (pautaCollectionIdentifiers.includes(pautaIdentifier)) {
          return false;
        }
        pautaCollectionIdentifiers.push(pautaIdentifier);
        return true;
      });
      return [...pautasToAdd, ...pautaCollection];
    }
    return pautaCollection;
  }
}
