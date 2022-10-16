import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFotoDocumento } from '../foto-documento.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../foto-documento.test-samples';

import { FotoDocumentoService } from './foto-documento.service';

const requireRestSample: IFotoDocumento = {
  ...sampleWithRequiredData,
};

describe('FotoDocumento Service', () => {
  let service: FotoDocumentoService;
  let httpMock: HttpTestingController;
  let expectedResult: IFotoDocumento | IFotoDocumento[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FotoDocumentoService);
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

    it('should create a FotoDocumento', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fotoDocumento = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fotoDocumento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FotoDocumento', () => {
      const fotoDocumento = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fotoDocumento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FotoDocumento', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FotoDocumento', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FotoDocumento', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFotoDocumentoToCollectionIfMissing', () => {
      it('should add a FotoDocumento to an empty array', () => {
        const fotoDocumento: IFotoDocumento = sampleWithRequiredData;
        expectedResult = service.addFotoDocumentoToCollectionIfMissing([], fotoDocumento);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fotoDocumento);
      });

      it('should not add a FotoDocumento to an array that contains it', () => {
        const fotoDocumento: IFotoDocumento = sampleWithRequiredData;
        const fotoDocumentoCollection: IFotoDocumento[] = [
          {
            ...fotoDocumento,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFotoDocumentoToCollectionIfMissing(fotoDocumentoCollection, fotoDocumento);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FotoDocumento to an array that doesn't contain it", () => {
        const fotoDocumento: IFotoDocumento = sampleWithRequiredData;
        const fotoDocumentoCollection: IFotoDocumento[] = [sampleWithPartialData];
        expectedResult = service.addFotoDocumentoToCollectionIfMissing(fotoDocumentoCollection, fotoDocumento);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fotoDocumento);
      });

      it('should add only unique FotoDocumento to an array', () => {
        const fotoDocumentoArray: IFotoDocumento[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fotoDocumentoCollection: IFotoDocumento[] = [sampleWithRequiredData];
        expectedResult = service.addFotoDocumentoToCollectionIfMissing(fotoDocumentoCollection, ...fotoDocumentoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fotoDocumento: IFotoDocumento = sampleWithRequiredData;
        const fotoDocumento2: IFotoDocumento = sampleWithPartialData;
        expectedResult = service.addFotoDocumentoToCollectionIfMissing([], fotoDocumento, fotoDocumento2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fotoDocumento);
        expect(expectedResult).toContain(fotoDocumento2);
      });

      it('should accept null and undefined values', () => {
        const fotoDocumento: IFotoDocumento = sampleWithRequiredData;
        expectedResult = service.addFotoDocumentoToCollectionIfMissing([], null, fotoDocumento, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fotoDocumento);
      });

      it('should return initial array if no FotoDocumento is added', () => {
        const fotoDocumentoCollection: IFotoDocumento[] = [sampleWithRequiredData];
        expectedResult = service.addFotoDocumentoToCollectionIfMissing(fotoDocumentoCollection, undefined, null);
        expect(expectedResult).toEqual(fotoDocumentoCollection);
      });
    });

    describe('compareFotoDocumento', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFotoDocumento(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFotoDocumento(entity1, entity2);
        const compareResult2 = service.compareFotoDocumento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFotoDocumento(entity1, entity2);
        const compareResult2 = service.compareFotoDocumento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFotoDocumento(entity1, entity2);
        const compareResult2 = service.compareFotoDocumento(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
