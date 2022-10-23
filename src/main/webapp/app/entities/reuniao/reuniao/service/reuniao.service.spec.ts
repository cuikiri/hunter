import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { TipoReuniao } from 'app/entities/enumerations/tipo-reuniao.model';
import { IReuniao, Reuniao } from '../reuniao.model';

import { ReuniaoService } from './reuniao.service';

describe('Reuniao Service', () => {
  let service: ReuniaoService;
  let httpMock: HttpTestingController;
  let elemDefault: IReuniao;
  let expectedResult: IReuniao | IReuniao[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ReuniaoService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      nome: 'AAAAAAA',
      descricao: 'AAAAAAA',
      data: currentDate,
      dataInicio: currentDate,
      dataFim: currentDate,
      horaInicio: 'AAAAAAA',
      horaFim: 'AAAAAAA',
      tipoReuniao: TipoReuniao.DELIBERATIVA,
      obs: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          data: currentDate.format(DATE_FORMAT),
          dataInicio: currentDate.format(DATE_FORMAT),
          dataFim: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Reuniao', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          data: currentDate.format(DATE_FORMAT),
          dataInicio: currentDate.format(DATE_FORMAT),
          dataFim: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          data: currentDate,
          dataInicio: currentDate,
          dataFim: currentDate,
        },
        returnedFromService
      );

      service.create(new Reuniao()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Reuniao', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          descricao: 'BBBBBB',
          data: currentDate.format(DATE_FORMAT),
          dataInicio: currentDate.format(DATE_FORMAT),
          dataFim: currentDate.format(DATE_FORMAT),
          horaInicio: 'BBBBBB',
          horaFim: 'BBBBBB',
          tipoReuniao: 'BBBBBB',
          obs: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          data: currentDate,
          dataInicio: currentDate,
          dataFim: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Reuniao', () => {
      const patchObject = Object.assign(
        {
          nome: 'BBBBBB',
          data: currentDate.format(DATE_FORMAT),
          dataInicio: currentDate.format(DATE_FORMAT),
          dataFim: currentDate.format(DATE_FORMAT),
        },
        new Reuniao()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          data: currentDate,
          dataInicio: currentDate,
          dataFim: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Reuniao', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          descricao: 'BBBBBB',
          data: currentDate.format(DATE_FORMAT),
          dataInicio: currentDate.format(DATE_FORMAT),
          dataFim: currentDate.format(DATE_FORMAT),
          horaInicio: 'BBBBBB',
          horaFim: 'BBBBBB',
          tipoReuniao: 'BBBBBB',
          obs: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          data: currentDate,
          dataInicio: currentDate,
          dataFim: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Reuniao', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addReuniaoToCollectionIfMissing', () => {
      it('should add a Reuniao to an empty array', () => {
        const reuniao: IReuniao = { id: 123 };
        expectedResult = service.addReuniaoToCollectionIfMissing([], reuniao);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reuniao);
      });

      it('should not add a Reuniao to an array that contains it', () => {
        const reuniao: IReuniao = { id: 123 };
        const reuniaoCollection: IReuniao[] = [
          {
            ...reuniao,
          },
          { id: 456 },
        ];
        expectedResult = service.addReuniaoToCollectionIfMissing(reuniaoCollection, reuniao);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Reuniao to an array that doesn't contain it", () => {
        const reuniao: IReuniao = { id: 123 };
        const reuniaoCollection: IReuniao[] = [{ id: 456 }];
        expectedResult = service.addReuniaoToCollectionIfMissing(reuniaoCollection, reuniao);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reuniao);
      });

      it('should add only unique Reuniao to an array', () => {
        const reuniaoArray: IReuniao[] = [{ id: 123 }, { id: 456 }, { id: 51691 }];
        const reuniaoCollection: IReuniao[] = [{ id: 123 }];
        expectedResult = service.addReuniaoToCollectionIfMissing(reuniaoCollection, ...reuniaoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const reuniao: IReuniao = { id: 123 };
        const reuniao2: IReuniao = { id: 456 };
        expectedResult = service.addReuniaoToCollectionIfMissing([], reuniao, reuniao2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reuniao);
        expect(expectedResult).toContain(reuniao2);
      });

      it('should accept null and undefined values', () => {
        const reuniao: IReuniao = { id: 123 };
        expectedResult = service.addReuniaoToCollectionIfMissing([], null, reuniao, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reuniao);
      });

      it('should return initial array if no Reuniao is added', () => {
        const reuniaoCollection: IReuniao[] = [{ id: 123 }];
        expectedResult = service.addReuniaoToCollectionIfMissing(reuniaoCollection, undefined, null);
        expect(expectedResult).toEqual(reuniaoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
