import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IVotoSimDecisao, VotoSimDecisao } from '../voto-sim-decisao.model';

import { VotoSimDecisaoService } from './voto-sim-decisao.service';

describe('VotoSimDecisao Service', () => {
  let service: VotoSimDecisaoService;
  let httpMock: HttpTestingController;
  let elemDefault: IVotoSimDecisao;
  let expectedResult: IVotoSimDecisao | IVotoSimDecisao[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VotoSimDecisaoService);
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

    it('should create a VotoSimDecisao', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new VotoSimDecisao()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a VotoSimDecisao', () => {
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

    it('should partial update a VotoSimDecisao', () => {
      const patchObject = Object.assign(
        {
          nome: 'BBBBBB',
          obs: 'BBBBBB',
        },
        new VotoSimDecisao()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of VotoSimDecisao', () => {
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

    it('should delete a VotoSimDecisao', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addVotoSimDecisaoToCollectionIfMissing', () => {
      it('should add a VotoSimDecisao to an empty array', () => {
        const votoSimDecisao: IVotoSimDecisao = { id: 123 };
        expectedResult = service.addVotoSimDecisaoToCollectionIfMissing([], votoSimDecisao);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(votoSimDecisao);
      });

      it('should not add a VotoSimDecisao to an array that contains it', () => {
        const votoSimDecisao: IVotoSimDecisao = { id: 123 };
        const votoSimDecisaoCollection: IVotoSimDecisao[] = [
          {
            ...votoSimDecisao,
          },
          { id: 456 },
        ];
        expectedResult = service.addVotoSimDecisaoToCollectionIfMissing(votoSimDecisaoCollection, votoSimDecisao);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a VotoSimDecisao to an array that doesn't contain it", () => {
        const votoSimDecisao: IVotoSimDecisao = { id: 123 };
        const votoSimDecisaoCollection: IVotoSimDecisao[] = [{ id: 456 }];
        expectedResult = service.addVotoSimDecisaoToCollectionIfMissing(votoSimDecisaoCollection, votoSimDecisao);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(votoSimDecisao);
      });

      it('should add only unique VotoSimDecisao to an array', () => {
        const votoSimDecisaoArray: IVotoSimDecisao[] = [{ id: 123 }, { id: 456 }, { id: 70344 }];
        const votoSimDecisaoCollection: IVotoSimDecisao[] = [{ id: 123 }];
        expectedResult = service.addVotoSimDecisaoToCollectionIfMissing(votoSimDecisaoCollection, ...votoSimDecisaoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const votoSimDecisao: IVotoSimDecisao = { id: 123 };
        const votoSimDecisao2: IVotoSimDecisao = { id: 456 };
        expectedResult = service.addVotoSimDecisaoToCollectionIfMissing([], votoSimDecisao, votoSimDecisao2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(votoSimDecisao);
        expect(expectedResult).toContain(votoSimDecisao2);
      });

      it('should accept null and undefined values', () => {
        const votoSimDecisao: IVotoSimDecisao = { id: 123 };
        expectedResult = service.addVotoSimDecisaoToCollectionIfMissing([], null, votoSimDecisao, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(votoSimDecisao);
      });

      it('should return initial array if no VotoSimDecisao is added', () => {
        const votoSimDecisaoCollection: IVotoSimDecisao[] = [{ id: 123 }];
        expectedResult = service.addVotoSimDecisaoToCollectionIfMissing(votoSimDecisaoCollection, undefined, null);
        expect(expectedResult).toEqual(votoSimDecisaoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
