import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IVotoNaoDecisao } from '../voto-nao-decisao.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../voto-nao-decisao.test-samples';

import { VotoNaoDecisaoService } from './voto-nao-decisao.service';

const requireRestSample: IVotoNaoDecisao = {
  ...sampleWithRequiredData,
};

describe('VotoNaoDecisao Service', () => {
  let service: VotoNaoDecisaoService;
  let httpMock: HttpTestingController;
  let expectedResult: IVotoNaoDecisao | IVotoNaoDecisao[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VotoNaoDecisaoService);
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

    it('should create a VotoNaoDecisao', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const votoNaoDecisao = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(votoNaoDecisao).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a VotoNaoDecisao', () => {
      const votoNaoDecisao = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(votoNaoDecisao).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a VotoNaoDecisao', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of VotoNaoDecisao', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a VotoNaoDecisao', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addVotoNaoDecisaoToCollectionIfMissing', () => {
      it('should add a VotoNaoDecisao to an empty array', () => {
        const votoNaoDecisao: IVotoNaoDecisao = sampleWithRequiredData;
        expectedResult = service.addVotoNaoDecisaoToCollectionIfMissing([], votoNaoDecisao);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(votoNaoDecisao);
      });

      it('should not add a VotoNaoDecisao to an array that contains it', () => {
        const votoNaoDecisao: IVotoNaoDecisao = sampleWithRequiredData;
        const votoNaoDecisaoCollection: IVotoNaoDecisao[] = [
          {
            ...votoNaoDecisao,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addVotoNaoDecisaoToCollectionIfMissing(votoNaoDecisaoCollection, votoNaoDecisao);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a VotoNaoDecisao to an array that doesn't contain it", () => {
        const votoNaoDecisao: IVotoNaoDecisao = sampleWithRequiredData;
        const votoNaoDecisaoCollection: IVotoNaoDecisao[] = [sampleWithPartialData];
        expectedResult = service.addVotoNaoDecisaoToCollectionIfMissing(votoNaoDecisaoCollection, votoNaoDecisao);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(votoNaoDecisao);
      });

      it('should add only unique VotoNaoDecisao to an array', () => {
        const votoNaoDecisaoArray: IVotoNaoDecisao[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const votoNaoDecisaoCollection: IVotoNaoDecisao[] = [sampleWithRequiredData];
        expectedResult = service.addVotoNaoDecisaoToCollectionIfMissing(votoNaoDecisaoCollection, ...votoNaoDecisaoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const votoNaoDecisao: IVotoNaoDecisao = sampleWithRequiredData;
        const votoNaoDecisao2: IVotoNaoDecisao = sampleWithPartialData;
        expectedResult = service.addVotoNaoDecisaoToCollectionIfMissing([], votoNaoDecisao, votoNaoDecisao2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(votoNaoDecisao);
        expect(expectedResult).toContain(votoNaoDecisao2);
      });

      it('should accept null and undefined values', () => {
        const votoNaoDecisao: IVotoNaoDecisao = sampleWithRequiredData;
        expectedResult = service.addVotoNaoDecisaoToCollectionIfMissing([], null, votoNaoDecisao, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(votoNaoDecisao);
      });

      it('should return initial array if no VotoNaoDecisao is added', () => {
        const votoNaoDecisaoCollection: IVotoNaoDecisao[] = [sampleWithRequiredData];
        expectedResult = service.addVotoNaoDecisaoToCollectionIfMissing(votoNaoDecisaoCollection, undefined, null);
        expect(expectedResult).toEqual(votoNaoDecisaoCollection);
      });
    });

    describe('compareVotoNaoDecisao', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareVotoNaoDecisao(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareVotoNaoDecisao(entity1, entity2);
        const compareResult2 = service.compareVotoNaoDecisao(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareVotoNaoDecisao(entity1, entity2);
        const compareResult2 = service.compareVotoNaoDecisao(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareVotoNaoDecisao(entity1, entity2);
        const compareResult2 = service.compareVotoNaoDecisao(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
