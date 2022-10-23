import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPauta, Pauta } from '../pauta.model';

import { PautaService } from './pauta.service';

describe('Pauta Service', () => {
  let service: PautaService;
  let httpMock: HttpTestingController;
  let elemDefault: IPauta;
  let expectedResult: IPauta | IPauta[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PautaService);
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

    it('should create a Pauta', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Pauta()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Pauta', () => {
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

    it('should partial update a Pauta', () => {
      const patchObject = Object.assign(
        {
          nome: 'BBBBBB',
        },
        new Pauta()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Pauta', () => {
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

    it('should delete a Pauta', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPautaToCollectionIfMissing', () => {
      it('should add a Pauta to an empty array', () => {
        const pauta: IPauta = { id: 123 };
        expectedResult = service.addPautaToCollectionIfMissing([], pauta);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pauta);
      });

      it('should not add a Pauta to an array that contains it', () => {
        const pauta: IPauta = { id: 123 };
        const pautaCollection: IPauta[] = [
          {
            ...pauta,
          },
          { id: 456 },
        ];
        expectedResult = service.addPautaToCollectionIfMissing(pautaCollection, pauta);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Pauta to an array that doesn't contain it", () => {
        const pauta: IPauta = { id: 123 };
        const pautaCollection: IPauta[] = [{ id: 456 }];
        expectedResult = service.addPautaToCollectionIfMissing(pautaCollection, pauta);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pauta);
      });

      it('should add only unique Pauta to an array', () => {
        const pautaArray: IPauta[] = [{ id: 123 }, { id: 456 }, { id: 68262 }];
        const pautaCollection: IPauta[] = [{ id: 123 }];
        expectedResult = service.addPautaToCollectionIfMissing(pautaCollection, ...pautaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pauta: IPauta = { id: 123 };
        const pauta2: IPauta = { id: 456 };
        expectedResult = service.addPautaToCollectionIfMissing([], pauta, pauta2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pauta);
        expect(expectedResult).toContain(pauta2);
      });

      it('should accept null and undefined values', () => {
        const pauta: IPauta = { id: 123 };
        expectedResult = service.addPautaToCollectionIfMissing([], null, pauta, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pauta);
      });

      it('should return initial array if no Pauta is added', () => {
        const pautaCollection: IPauta[] = [{ id: 123 }];
        expectedResult = service.addPautaToCollectionIfMissing(pautaCollection, undefined, null);
        expect(expectedResult).toEqual(pautaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
