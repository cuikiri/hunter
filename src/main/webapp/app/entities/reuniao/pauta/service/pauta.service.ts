import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPauta, getPautaIdentifier } from '../pauta.model';

export type EntityResponseType = HttpResponse<IPauta>;
export type EntityArrayResponseType = HttpResponse<IPauta[]>;

@Injectable({ providedIn: 'root' })
export class PautaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pautas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pauta: IPauta): Observable<EntityResponseType> {
    return this.http.post<IPauta>(this.resourceUrl, pauta, { observe: 'response' });
  }

  update(pauta: IPauta): Observable<EntityResponseType> {
    return this.http.put<IPauta>(`${this.resourceUrl}/${getPautaIdentifier(pauta) as number}`, pauta, { observe: 'response' });
  }

  partialUpdate(pauta: IPauta): Observable<EntityResponseType> {
    return this.http.patch<IPauta>(`${this.resourceUrl}/${getPautaIdentifier(pauta) as number}`, pauta, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPauta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByReuniaoId(id: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPauta[]>(`${this.resourceUrl}/reuniao/${id}`, { params: options, observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPauta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPautaToCollectionIfMissing(pautaCollection: IPauta[], ...pautasToCheck: (IPauta | null | undefined)[]): IPauta[] {
    const pautas: IPauta[] = pautasToCheck.filter(isPresent);
    if (pautas.length > 0) {
      const pautaCollectionIdentifiers = pautaCollection.map(pautaItem => getPautaIdentifier(pautaItem)!);
      const pautasToAdd = pautas.filter(pautaItem => {
        const pautaIdentifier = getPautaIdentifier(pautaItem);
        if (pautaIdentifier == null || pautaCollectionIdentifiers.includes(pautaIdentifier)) {
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
