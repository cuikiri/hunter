import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IReuniao } from '../reuniao.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../reuniao.test-samples';

import { ReuniaoService, RestReuniao } from './reuniao.service';

const requireRestSample: RestReuniao = {
  ...sampleWithRequiredData,
  data: sampleWithRequiredData.data?.format(DATE_FORMAT),
  dataInicio: sampleWithRequiredData.dataInicio?.format(DATE_FORMAT),
  dataFim: sampleWithRequiredData.dataFim?.format(DATE_FORMAT),
};

describe('Reuniao Service', () => {
  let service: ReuniaoService;
  let httpMock: HttpTestingController;
  let expectedResult: IReuniao | IReuniao[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ReuniaoService);
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

    it('should create a Reuniao', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const reuniao = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(reuniao).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Reuniao', () => {
      const reuniao = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(reuniao).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Reuniao', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Reuniao', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Reuniao', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addReuniaoToCollectionIfMissing', () => {
      it('should add a Reuniao to an empty array', () => {
        const reuniao: IReuniao = sampleWithRequiredData;
        expectedResult = service.addReuniaoToCollectionIfMissing([], reuniao);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reuniao);
      });

      it('should not add a Reuniao to an array that contains it', () => {
        const reuniao: IReuniao = sampleWithRequiredData;
        const reuniaoCollection: IReuniao[] = [
          {
            ...reuniao,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addReuniaoToCollectionIfMissing(reuniaoCollection, reuniao);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Reuniao to an array that doesn't contain it", () => {
        const reuniao: IReuniao = sampleWithRequiredData;
        const reuniaoCollection: IReuniao[] = [sampleWithPartialData];
        expectedResult = service.addReuniaoToCollectionIfMissing(reuniaoCollection, reuniao);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reuniao);
      });

      it('should add only unique Reuniao to an array', () => {
        const reuniaoArray: IReuniao[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const reuniaoCollection: IReuniao[] = [sampleWithRequiredData];
        expectedResult = service.addReuniaoToCollectionIfMissing(reuniaoCollection, ...reuniaoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const reuniao: IReuniao = sampleWithRequiredData;
        const reuniao2: IReuniao = sampleWithPartialData;
        expectedResult = service.addReuniaoToCollectionIfMissing([], reuniao, reuniao2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reuniao);
        expect(expectedResult).toContain(reuniao2);
      });

      it('should accept null and undefined values', () => {
        const reuniao: IReuniao = sampleWithRequiredData;
        expectedResult = service.addReuniaoToCollectionIfMissing([], null, reuniao, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reuniao);
      });

      it('should return initial array if no Reuniao is added', () => {
        const reuniaoCollection: IReuniao[] = [sampleWithRequiredData];
        expectedResult = service.addReuniaoToCollectionIfMissing(reuniaoCollection, undefined, null);
        expect(expectedResult).toEqual(reuniaoCollection);
      });
    });

    describe('compareReuniao', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareReuniao(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareReuniao(entity1, entity2);
        const compareResult2 = service.compareReuniao(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareReuniao(entity1, entity2);
        const compareResult2 = service.compareReuniao(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareReuniao(entity1, entity2);
        const compareResult2 = service.compareReuniao(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
