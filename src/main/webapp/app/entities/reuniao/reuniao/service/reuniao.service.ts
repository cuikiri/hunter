import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IReuniao, getReuniaoIdentifier } from '../reuniao.model';
import { IFiltroReuniao } from '../filtroReuniao.models';

export type EntityResponseType = HttpResponse<IReuniao>;
export type EntityArrayResponseType = HttpResponse<IReuniao[]>;

@Injectable({ providedIn: 'root' })
export class ReuniaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/reuniaos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(reuniao: IReuniao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reuniao);
    return this.http
      .post<IReuniao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reuniao: IReuniao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reuniao);
    return this.http
      .put<IReuniao>(`${this.resourceUrl}/${getReuniaoIdentifier(reuniao) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(reuniao: IReuniao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reuniao);
    return this.http
      .patch<IReuniao>(`${this.resourceUrl}/${getReuniaoIdentifier(reuniao) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReuniao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReuniao[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  print(filtro: IFiltroReuniao): Observable<HttpResponse<any>> {
    return this.http.post(`${this.resourceUrl}/all/jasper`, filtro, { observe: 'response', responseType: 'blob' });
  }

  addReuniaoToCollectionIfMissing(reuniaoCollection: IReuniao[], ...reuniaosToCheck: (IReuniao | null | undefined)[]): IReuniao[] {
    const reuniaos: IReuniao[] = reuniaosToCheck.filter(isPresent);
    if (reuniaos.length > 0) {
      const reuniaoCollectionIdentifiers = reuniaoCollection.map(reuniaoItem => getReuniaoIdentifier(reuniaoItem)!);
      const reuniaosToAdd = reuniaos.filter(reuniaoItem => {
        const reuniaoIdentifier = getReuniaoIdentifier(reuniaoItem);
        if (reuniaoIdentifier == null || reuniaoCollectionIdentifiers.includes(reuniaoIdentifier)) {
          return false;
        }
        reuniaoCollectionIdentifiers.push(reuniaoIdentifier);
        return true;
      });
      return [...reuniaosToAdd, ...reuniaoCollection];
    }
    return reuniaoCollection;
  }

  protected convertDateFromClient(reuniao: IReuniao): IReuniao {
    return Object.assign({}, reuniao, {
      data: reuniao.data?.isValid() ? reuniao.data.format(DATE_FORMAT) : undefined,
      dataInicio: reuniao.dataInicio?.isValid() ? reuniao.dataInicio.format(DATE_FORMAT) : undefined,
      dataFim: reuniao.dataFim?.isValid() ? reuniao.dataFim.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.data = res.body.data ? dayjs(res.body.data) : undefined;
      res.body.dataInicio = res.body.dataInicio ? dayjs(res.body.dataInicio) : undefined;
      res.body.dataFim = res.body.dataFim ? dayjs(res.body.dataFim) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((reuniao: IReuniao) => {
        reuniao.data = reuniao.data ? dayjs(reuniao.data) : undefined;
        reuniao.dataInicio = reuniao.dataInicio ? dayjs(reuniao.dataInicio) : undefined;
        reuniao.dataFim = reuniao.dataFim ? dayjs(reuniao.dataFim) : undefined;
      });
    }
    return res;
  }
}
