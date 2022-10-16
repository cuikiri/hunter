import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IVotoNaoDecisao } from '../voto-nao-decisao.model';
import { VotoNaoDecisaoService } from '../service/voto-nao-decisao.service';

import { VotoNaoDecisaoRoutingResolveService } from './voto-nao-decisao-routing-resolve.service';

describe('VotoNaoDecisao routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: VotoNaoDecisaoRoutingResolveService;
  let service: VotoNaoDecisaoService;
  let resultVotoNaoDecisao: IVotoNaoDecisao | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(VotoNaoDecisaoRoutingResolveService);
    service = TestBed.inject(VotoNaoDecisaoService);
    resultVotoNaoDecisao = undefined;
  });

  describe('resolve', () => {
    it('should return IVotoNaoDecisao returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVotoNaoDecisao = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVotoNaoDecisao).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVotoNaoDecisao = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultVotoNaoDecisao).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IVotoNaoDecisao>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVotoNaoDecisao = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVotoNaoDecisao).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
