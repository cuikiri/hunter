import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPauta } from '../pauta.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../pauta.test-samples';

import { PautaService } from './pauta.service';

const requireRestSample: IPauta = {
  ...sampleWithRequiredData,
};

describe('Pauta Service', () => {
  let service: PautaService;
  let httpMock: HttpTestingController;
  let expectedResult: IPauta | IPauta[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PautaService);
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

    it('should create a Pauta', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const pauta = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(pauta).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Pauta', () => {
      const pauta = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(pauta).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Pauta', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Pauta', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Pauta', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPautaToCollectionIfMissing', () => {
      it('should add a Pauta to an empty array', () => {
        const pauta: IPauta = sampleWithRequiredData;
        expectedResult = service.addPautaToCollectionIfMissing([], pauta);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pauta);
      });

      it('should not add a Pauta to an array that contains it', () => {
        const pauta: IPauta = sampleWithRequiredData;
        const pautaCollection: IPauta[] = [
          {
            ...pauta,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPautaToCollectionIfMissing(pautaCollection, pauta);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Pauta to an array that doesn't contain it", () => {
        const pauta: IPauta = sampleWithRequiredData;
        const pautaCollection: IPauta[] = [sampleWithPartialData];
        expectedResult = service.addPautaToCollectionIfMissing(pautaCollection, pauta);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pauta);
      });

      it('should add only unique Pauta to an array', () => {
        const pautaArray: IPauta[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const pautaCollection: IPauta[] = [sampleWithRequiredData];
        expectedResult = service.addPautaToCollectionIfMissing(pautaCollection, ...pautaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pauta: IPauta = sampleWithRequiredData;
        const pauta2: IPauta = sampleWithPartialData;
        expectedResult = service.addPautaToCollectionIfMissing([], pauta, pauta2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pauta);
        expect(expectedResult).toContain(pauta2);
      });

      it('should accept null and undefined values', () => {
        const pauta: IPauta = sampleWithRequiredData;
        expectedResult = service.addPautaToCollectionIfMissing([], null, pauta, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pauta);
      });

      it('should return initial array if no Pauta is added', () => {
        const pautaCollection: IPauta[] = [sampleWithRequiredData];
        expectedResult = service.addPautaToCollectionIfMissing(pautaCollection, undefined, null);
        expect(expectedResult).toEqual(pautaCollection);
      });
    });

    describe('comparePauta', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePauta(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePauta(entity1, entity2);
        const compareResult2 = service.comparePauta(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePauta(entity1, entity2);
        const compareResult2 = service.comparePauta(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePauta(entity1, entity2);
        const compareResult2 = service.comparePauta(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
