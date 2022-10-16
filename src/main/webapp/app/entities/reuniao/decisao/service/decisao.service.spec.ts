import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDecisao } from '../decisao.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../decisao.test-samples';

import { DecisaoService } from './decisao.service';

const requireRestSample: IDecisao = {
  ...sampleWithRequiredData,
};

describe('Decisao Service', () => {
  let service: DecisaoService;
  let httpMock: HttpTestingController;
  let expectedResult: IDecisao | IDecisao[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DecisaoService);
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

    it('should create a Decisao', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const decisao = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(decisao).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Decisao', () => {
      const decisao = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(decisao).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Decisao', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Decisao', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Decisao', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDecisaoToCollectionIfMissing', () => {
      it('should add a Decisao to an empty array', () => {
        const decisao: IDecisao = sampleWithRequiredData;
        expectedResult = service.addDecisaoToCollectionIfMissing([], decisao);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(decisao);
      });

      it('should not add a Decisao to an array that contains it', () => {
        const decisao: IDecisao = sampleWithRequiredData;
        const decisaoCollection: IDecisao[] = [
          {
            ...decisao,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDecisaoToCollectionIfMissing(decisaoCollection, decisao);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Decisao to an array that doesn't contain it", () => {
        const decisao: IDecisao = sampleWithRequiredData;
        const decisaoCollection: IDecisao[] = [sampleWithPartialData];
        expectedResult = service.addDecisaoToCollectionIfMissing(decisaoCollection, decisao);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(decisao);
      });

      it('should add only unique Decisao to an array', () => {
        const decisaoArray: IDecisao[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const decisaoCollection: IDecisao[] = [sampleWithRequiredData];
        expectedResult = service.addDecisaoToCollectionIfMissing(decisaoCollection, ...decisaoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const decisao: IDecisao = sampleWithRequiredData;
        const decisao2: IDecisao = sampleWithPartialData;
        expectedResult = service.addDecisaoToCollectionIfMissing([], decisao, decisao2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(decisao);
        expect(expectedResult).toContain(decisao2);
      });

      it('should accept null and undefined values', () => {
        const decisao: IDecisao = sampleWithRequiredData;
        expectedResult = service.addDecisaoToCollectionIfMissing([], null, decisao, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(decisao);
      });

      it('should return initial array if no Decisao is added', () => {
        const decisaoCollection: IDecisao[] = [sampleWithRequiredData];
        expectedResult = service.addDecisaoToCollectionIfMissing(decisaoCollection, undefined, null);
        expect(expectedResult).toEqual(decisaoCollection);
      });
    });

    describe('compareDecisao', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDecisao(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDecisao(entity1, entity2);
        const compareResult2 = service.compareDecisao(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDecisao(entity1, entity2);
        const compareResult2 = service.compareDecisao(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDecisao(entity1, entity2);
        const compareResult2 = service.compareDecisao(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
