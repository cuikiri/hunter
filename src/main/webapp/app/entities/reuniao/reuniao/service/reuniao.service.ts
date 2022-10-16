import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IReuniao, NewReuniao } from '../reuniao.model';

export type PartialUpdateReuniao = Partial<IReuniao> & Pick<IReuniao, 'id'>;

type RestOf<T extends IReuniao | NewReuniao> = Omit<T, 'data' | 'dataInicio' | 'dataFim'> & {
  data?: string | null;
  dataInicio?: string | null;
  dataFim?: string | null;
};

export type RestReuniao = RestOf<IReuniao>;

export type NewRestReuniao = RestOf<NewReuniao>;

export type PartialUpdateRestReuniao = RestOf<PartialUpdateReuniao>;

export type EntityResponseType = HttpResponse<IReuniao>;
export type EntityArrayResponseType = HttpResponse<IReuniao[]>;

@Injectable({ providedIn: 'root' })
export class ReuniaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/reuniaos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(reuniao: NewReuniao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reuniao);
    return this.http
      .post<RestReuniao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(reuniao: IReuniao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reuniao);
    return this.http
      .put<RestReuniao>(`${this.resourceUrl}/${this.getReuniaoIdentifier(reuniao)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(reuniao: PartialUpdateReuniao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reuniao);
    return this.http
      .patch<RestReuniao>(`${this.resourceUrl}/${this.getReuniaoIdentifier(reuniao)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestReuniao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestReuniao[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getReuniaoIdentifier(reuniao: Pick<IReuniao, 'id'>): number {
    return reuniao.id;
  }

  compareReuniao(o1: Pick<IReuniao, 'id'> | null, o2: Pick<IReuniao, 'id'> | null): boolean {
    return o1 && o2 ? this.getReuniaoIdentifier(o1) === this.getReuniaoIdentifier(o2) : o1 === o2;
  }

  addReuniaoToCollectionIfMissing<Type extends Pick<IReuniao, 'id'>>(
    reuniaoCollection: Type[],
    ...reuniaosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const reuniaos: Type[] = reuniaosToCheck.filter(isPresent);
    if (reuniaos.length > 0) {
      const reuniaoCollectionIdentifiers = reuniaoCollection.map(reuniaoItem => this.getReuniaoIdentifier(reuniaoItem)!);
      const reuniaosToAdd = reuniaos.filter(reuniaoItem => {
        const reuniaoIdentifier = this.getReuniaoIdentifier(reuniaoItem);
        if (reuniaoCollectionIdentifiers.includes(reuniaoIdentifier)) {
          return false;
        }
        reuniaoCollectionIdentifiers.push(reuniaoIdentifier);
        return true;
      });
      return [...reuniaosToAdd, ...reuniaoCollection];
    }
    return reuniaoCollection;
  }

  protected convertDateFromClient<T extends IReuniao | NewReuniao | PartialUpdateReuniao>(reuniao: T): RestOf<T> {
    return {
      ...reuniao,
      data: reuniao.data?.format(DATE_FORMAT) ?? null,
      dataInicio: reuniao.dataInicio?.format(DATE_FORMAT) ?? null,
      dataFim: reuniao.dataFim?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restReuniao: RestReuniao): IReuniao {
    return {
      ...restReuniao,
      data: restReuniao.data ? dayjs(restReuniao.data) : undefined,
      dataInicio: restReuniao.dataInicio ? dayjs(restReuniao.dataInicio) : undefined,
      dataFim: restReuniao.dataFim ? dayjs(restReuniao.dataFim) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestReuniao>): HttpResponse<IReuniao> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestReuniao[]>): HttpResponse<IReuniao[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
