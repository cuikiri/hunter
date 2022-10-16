import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAcao } from '../acao.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../acao.test-samples';

import { AcaoService } from './acao.service';

const requireRestSample: IAcao = {
  ...sampleWithRequiredData,
};

describe('Acao Service', () => {
  let service: AcaoService;
  let httpMock: HttpTestingController;
  let expectedResult: IAcao | IAcao[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AcaoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Acao', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const acao = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(acao).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Acao', () => {
      const acao = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(acao).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Acao', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Acao', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Acao', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAcaoToCollectionIfMissing', () => {
      it('should add a Acao to an empty array', () => {
        const acao: IAcao = sampleWithRequiredData;
        expectedResult = service.addAcaoToCollectionIfMissing([], acao);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(acao);
      });

      it('should not add a Acao to an array that contains it', () => {
        const acao: IAcao = sampleWithRequiredData;
        const acaoCollection: IAcao[] = [
          {
            ...acao,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAcaoToCollectionIfMissing(acaoCollection, acao);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Acao to an array that doesn't contain it", () => {
        const acao: IAcao = sampleWithRequiredData;
        const acaoCollection: IAcao[] = [sampleWithPartialData];
        expectedResult = service.addAcaoToCollectionIfMissing(acaoCollection, acao);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(acao);
      });

      it('should add only unique Acao to an array', () => {
        const acaoArray: IAcao[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const acaoCollection: IAcao[] = [sampleWithRequiredData];
        expectedResult = service.addAcaoToCollectionIfMissing(acaoCollection, ...acaoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const acao: IAcao = sampleWithRequiredData;
        const acao2: IAcao = sampleWithPartialData;
        expectedResult = service.addAcaoToCollectionIfMissing([], acao, acao2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(acao);
        expect(expectedResult).toContain(acao2);
      });

      it('should accept null and undefined values', () => {
        const acao: IAcao = sampleWithRequiredData;
        expectedResult = service.addAcaoToCollectionIfMissing([], null, acao, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(acao);
      });

      it('should return initial array if no Acao is added', () => {
        const acaoCollection: IAcao[] = [sampleWithRequiredData];
        expectedResult = service.addAcaoToCollectionIfMissing(acaoCollection, undefined, null);
        expect(expectedResult).toEqual(acaoCollection);
      });
    });

    describe('compareAcao', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAcao(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAcao(entity1, entity2);
        const compareResult2 = service.compareAcao(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAcao(entity1, entity2);
        const compareResult2 = service.compareAcao(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAcao(entity1, entity2);
        const compareResult2 = service.compareAcao(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
