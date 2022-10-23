import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IVotoNaoDecisao, VotoNaoDecisao } from '../voto-nao-decisao.model';

import { VotoNaoDecisaoService } from './voto-nao-decisao.service';

describe('VotoNaoDecisao Service', () => {
  let service: VotoNaoDecisaoService;
  let httpMock: HttpTestingController;
  let elemDefault: IVotoNaoDecisao;
  let expectedResult: IVotoNaoDecisao | IVotoNaoDecisao[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VotoNaoDecisaoService);
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

    it('should create a VotoNaoDecisao', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new VotoNaoDecisao()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a VotoNaoDecisao', () => {
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

    it('should partial update a VotoNaoDecisao', () => {
      const patchObject = Object.assign(
        {
          nome: 'BBBBBB',
        },
        new VotoNaoDecisao()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of VotoNaoDecisao', () => {
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

    it('should delete a VotoNaoDecisao', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addVotoNaoDecisaoToCollectionIfMissing', () => {
      it('should add a VotoNaoDecisao to an empty array', () => {
        const votoNaoDecisao: IVotoNaoDecisao = { id: 123 };
        expectedResult = service.addVotoNaoDecisaoToCollectionIfMissing([], votoNaoDecisao);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(votoNaoDecisao);
      });

      it('should not add a VotoNaoDecisao to an array that contains it', () => {
        const votoNaoDecisao: IVotoNaoDecisao = { id: 123 };
        const votoNaoDecisaoCollection: IVotoNaoDecisao[] = [
          {
            ...votoNaoDecisao,
          },
          { id: 456 },
        ];
        expectedResult = service.addVotoNaoDecisaoToCollectionIfMissing(votoNaoDecisaoCollection, votoNaoDecisao);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a VotoNaoDecisao to an array that doesn't contain it", () => {
        const votoNaoDecisao: IVotoNaoDecisao = { id: 123 };
        const votoNaoDecisaoCollection: IVotoNaoDecisao[] = [{ id: 456 }];
        expectedResult = service.addVotoNaoDecisaoToCollectionIfMissing(votoNaoDecisaoCollection, votoNaoDecisao);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(votoNaoDecisao);
      });

      it('should add only unique VotoNaoDecisao to an array', () => {
        const votoNaoDecisaoArray: IVotoNaoDecisao[] = [{ id: 123 }, { id: 456 }, { id: 77423 }];
        const votoNaoDecisaoCollection: IVotoNaoDecisao[] = [{ id: 123 }];
        expectedResult = service.addVotoNaoDecisaoToCollectionIfMissing(votoNaoDecisaoCollection, ...votoNaoDecisaoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const votoNaoDecisao: IVotoNaoDecisao = { id: 123 };
        const votoNaoDecisao2: IVotoNaoDecisao = { id: 456 };
        expectedResult = service.addVotoNaoDecisaoToCollectionIfMissing([], votoNaoDecisao, votoNaoDecisao2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(votoNaoDecisao);
        expect(expectedResult).toContain(votoNaoDecisao2);
      });

      it('should accept null and undefined values', () => {
        const votoNaoDecisao: IVotoNaoDecisao = { id: 123 };
        expectedResult = service.addVotoNaoDecisaoToCollectionIfMissing([], null, votoNaoDecisao, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(votoNaoDecisao);
      });

      it('should return initial array if no VotoNaoDecisao is added', () => {
        const votoNaoDecisaoCollection: IVotoNaoDecisao[] = [{ id: 123 }];
        expectedResult = service.addVotoNaoDecisaoToCollectionIfMissing(votoNaoDecisaoCollection, undefined, null);
        expect(expectedResult).toEqual(votoNaoDecisaoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
