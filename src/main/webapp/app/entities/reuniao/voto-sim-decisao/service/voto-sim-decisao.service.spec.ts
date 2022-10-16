import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IVotoSimDecisao } from '../voto-sim-decisao.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../voto-sim-decisao.test-samples';

import { VotoSimDecisaoService } from './voto-sim-decisao.service';

const requireRestSample: IVotoSimDecisao = {
  ...sampleWithRequiredData,
};

describe('VotoSimDecisao Service', () => {
  let service: VotoSimDecisaoService;
  let httpMock: HttpTestingController;
  let expectedResult: IVotoSimDecisao | IVotoSimDecisao[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VotoSimDecisaoService);
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

    it('should create a VotoSimDecisao', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const votoSimDecisao = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(votoSimDecisao).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a VotoSimDecisao', () => {
      const votoSimDecisao = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(votoSimDecisao).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a VotoSimDecisao', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of VotoSimDecisao', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a VotoSimDecisao', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addVotoSimDecisaoToCollectionIfMissing', () => {
      it('should add a VotoSimDecisao to an empty array', () => {
        const votoSimDecisao: IVotoSimDecisao = sampleWithRequiredData;
        expectedResult = service.addVotoSimDecisaoToCollectionIfMissing([], votoSimDecisao);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(votoSimDecisao);
      });

      it('should not add a VotoSimDecisao to an array that contains it', () => {
        const votoSimDecisao: IVotoSimDecisao = sampleWithRequiredData;
        const votoSimDecisaoCollection: IVotoSimDecisao[] = [
          {
            ...votoSimDecisao,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addVotoSimDecisaoToCollectionIfMissing(votoSimDecisaoCollection, votoSimDecisao);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a VotoSimDecisao to an array that doesn't contain it", () => {
        const votoSimDecisao: IVotoSimDecisao = sampleWithRequiredData;
        const votoSimDecisaoCollection: IVotoSimDecisao[] = [sampleWithPartialData];
        expectedResult = service.addVotoSimDecisaoToCollectionIfMissing(votoSimDecisaoCollection, votoSimDecisao);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(votoSimDecisao);
      });

      it('should add only unique VotoSimDecisao to an array', () => {
        const votoSimDecisaoArray: IVotoSimDecisao[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const votoSimDecisaoCollection: IVotoSimDecisao[] = [sampleWithRequiredData];
        expectedResult = service.addVotoSimDecisaoToCollectionIfMissing(votoSimDecisaoCollection, ...votoSimDecisaoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const votoSimDecisao: IVotoSimDecisao = sampleWithRequiredData;
        const votoSimDecisao2: IVotoSimDecisao = sampleWithPartialData;
        expectedResult = service.addVotoSimDecisaoToCollectionIfMissing([], votoSimDecisao, votoSimDecisao2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(votoSimDecisao);
        expect(expectedResult).toContain(votoSimDecisao2);
      });

      it('should accept null and undefined values', () => {
        const votoSimDecisao: IVotoSimDecisao = sampleWithRequiredData;
        expectedResult = service.addVotoSimDecisaoToCollectionIfMissing([], null, votoSimDecisao, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(votoSimDecisao);
      });

      it('should return initial array if no VotoSimDecisao is added', () => {
        const votoSimDecisaoCollection: IVotoSimDecisao[] = [sampleWithRequiredData];
        expectedResult = service.addVotoSimDecisaoToCollectionIfMissing(votoSimDecisaoCollection, undefined, null);
        expect(expectedResult).toEqual(votoSimDecisaoCollection);
      });
    });

    describe('compareVotoSimDecisao', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareVotoSimDecisao(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareVotoSimDecisao(entity1, entity2);
        const compareResult2 = service.compareVotoSimDecisao(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareVotoSimDecisao(entity1, entity2);
        const compareResult2 = service.compareVotoSimDecisao(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareVotoSimDecisao(entity1, entity2);
        const compareResult2 = service.compareVotoSimDecisao(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
