import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDecisao, Decisao } from '../decisao.model';

import { DecisaoService } from './decisao.service';

describe('Decisao Service', () => {
  let service: DecisaoService;
  let httpMock: HttpTestingController;
  let elemDefault: IDecisao;
  let expectedResult: IDecisao | IDecisao[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DecisaoService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nome: 'AAAAAAA',
      obs: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Decisao', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Decisao()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Decisao', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          obs: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Decisao', () => {
      const patchObject = Object.assign(
        {
          obs: 'BBBBBB',
        },
        new Decisao()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Decisao', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          obs: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Decisao', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDecisaoToCollectionIfMissing', () => {
      it('should add a Decisao to an empty array', () => {
        const decisao: IDecisao = { id: 123 };
        expectedResult = service.addDecisaoToCollectionIfMissing([], decisao);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(decisao);
      });

      it('should not add a Decisao to an array that contains it', () => {
        const decisao: IDecisao = { id: 123 };
        const decisaoCollection: IDecisao[] = [
          {
            ...decisao,
          },
          { id: 456 },
        ];
        expectedResult = service.addDecisaoToCollectionIfMissing(decisaoCollection, decisao);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Decisao to an array that doesn't contain it", () => {
        const decisao: IDecisao = { id: 123 };
        const decisaoCollection: IDecisao[] = [{ id: 456 }];
        expectedResult = service.addDecisaoToCollectionIfMissing(decisaoCollection, decisao);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(decisao);
      });

      it('should add only unique Decisao to an array', () => {
        const decisaoArray: IDecisao[] = [{ id: 123 }, { id: 456 }, { id: 23706 }];
        const decisaoCollection: IDecisao[] = [{ id: 123 }];
        expectedResult = service.addDecisaoToCollectionIfMissing(decisaoCollection, ...decisaoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const decisao: IDecisao = { id: 123 };
        const decisao2: IDecisao = { id: 456 };
        expectedResult = service.addDecisaoToCollectionIfMissing([], decisao, decisao2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(decisao);
        expect(expectedResult).toContain(decisao2);
      });

      it('should accept null and undefined values', () => {
        const decisao: IDecisao = { id: 123 };
        expectedResult = service.addDecisaoToCollectionIfMissing([], null, decisao, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(decisao);
      });

      it('should return initial array if no Decisao is added', () => {
        const decisaoCollection: IDecisao[] = [{ id: 123 }];
        expectedResult = service.addDecisaoToCollectionIfMissing(decisaoCollection, undefined, null);
        expect(expectedResult).toEqual(decisaoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
