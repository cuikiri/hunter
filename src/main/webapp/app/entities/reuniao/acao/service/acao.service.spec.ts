import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAcao, Acao } from '../acao.model';

import { AcaoService } from './acao.service';

describe('Acao Service', () => {
  let service: AcaoService;
  let httpMock: HttpTestingController;
  let elemDefault: IAcao;
  let expectedResult: IAcao | IAcao[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AcaoService);
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

    it('should create a Acao', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Acao()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Acao', () => {
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

    it('should partial update a Acao', () => {
      const patchObject = Object.assign(
        {
          nome: 'BBBBBB',
          obs: 'BBBBBB',
        },
        new Acao()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Acao', () => {
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

    it('should delete a Acao', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAcaoToCollectionIfMissing', () => {
      it('should add a Acao to an empty array', () => {
        const acao: IAcao = { id: 123 };
        expectedResult = service.addAcaoToCollectionIfMissing([], acao);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(acao);
      });

      it('should not add a Acao to an array that contains it', () => {
        const acao: IAcao = { id: 123 };
        const acaoCollection: IAcao[] = [
          {
            ...acao,
          },
          { id: 456 },
        ];
        expectedResult = service.addAcaoToCollectionIfMissing(acaoCollection, acao);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Acao to an array that doesn't contain it", () => {
        const acao: IAcao = { id: 123 };
        const acaoCollection: IAcao[] = [{ id: 456 }];
        expectedResult = service.addAcaoToCollectionIfMissing(acaoCollection, acao);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(acao);
      });

      it('should add only unique Acao to an array', () => {
        const acaoArray: IAcao[] = [{ id: 123 }, { id: 456 }, { id: 93350 }];
        const acaoCollection: IAcao[] = [{ id: 123 }];
        expectedResult = service.addAcaoToCollectionIfMissing(acaoCollection, ...acaoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const acao: IAcao = { id: 123 };
        const acao2: IAcao = { id: 456 };
        expectedResult = service.addAcaoToCollectionIfMissing([], acao, acao2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(acao);
        expect(expectedResult).toContain(acao2);
      });

      it('should accept null and undefined values', () => {
        const acao: IAcao = { id: 123 };
        expectedResult = service.addAcaoToCollectionIfMissing([], null, acao, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(acao);
      });

      it('should return initial array if no Acao is added', () => {
        const acaoCollection: IAcao[] = [{ id: 123 }];
        expectedResult = service.addAcaoToCollectionIfMissing(acaoCollection, undefined, null);
        expect(expectedResult).toEqual(acaoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
