import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IParticipante, getParticipanteIdentifier } from '../participante.model';

export type EntityResponseType = HttpResponse<IParticipante>;
export type EntityArrayResponseType = HttpResponse<IParticipante[]>;

@Injectable({ providedIn: 'root' })
export class ParticipanteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/participantes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(participante: IParticipante): Observable<EntityResponseType> {
    return this.http.post<IParticipante>(this.resourceUrl, participante, { observe: 'response' });
  }

  update(participante: IParticipante): Observable<EntityResponseType> {
    return this.http.put<IParticipante>(`${this.resourceUrl}/${getParticipanteIdentifier(participante) as number}`, participante, {
      observe: 'response',
    });
  }

  partialUpdate(participante: IParticipante): Observable<EntityResponseType> {
    return this.http.patch<IParticipante>(`${this.resourceUrl}/${getParticipanteIdentifier(participante) as number}`, participante, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParticipante>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByReuniaoId(id: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParticipante[]>(`${this.resourceUrl}/reuniao/${id}`, { params: options, observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParticipante[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addParticipanteToCollectionIfMissing(
    participanteCollection: IParticipante[],
    ...participantesToCheck: (IParticipante | null | undefined)[]
  ): IParticipante[] {
    const participantes: IParticipante[] = participantesToCheck.filter(isPresent);
    if (participantes.length > 0) {
      const participanteCollectionIdentifiers = participanteCollection.map(
        participanteItem => getParticipanteIdentifier(participanteItem)!
      );
      const participantesToAdd = participantes.filter(participanteItem => {
        const participanteIdentifier = getParticipanteIdentifier(participanteItem);
        if (participanteIdentifier == null || participanteCollectionIdentifiers.includes(participanteIdentifier)) {
          return false;
        }
        participanteCollectionIdentifiers.push(participanteIdentifier);
        return true;
      });
      return [...participantesToAdd, ...participanteCollection];
    }
    return participanteCollection;
  }
}
