import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IVotoSimDecisao, VotoSimDecisao } from '../voto-sim-decisao.model';
import { VotoSimDecisaoService } from '../service/voto-sim-decisao.service';

import { VotoSimDecisaoRoutingResolveService } from './voto-sim-decisao-routing-resolve.service';

describe('VotoSimDecisao routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: VotoSimDecisaoRoutingResolveService;
  let service: VotoSimDecisaoService;
  let resultVotoSimDecisao: IVotoSimDecisao | undefined;

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
    routingResolveService = TestBed.inject(VotoSimDecisaoRoutingResolveService);
    service = TestBed.inject(VotoSimDecisaoService);
    resultVotoSimDecisao = undefined;
  });

  describe('resolve', () => {
    it('should return IVotoSimDecisao returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVotoSimDecisao = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVotoSimDecisao).toEqual({ id: 123 });
    });

    it('should return new IVotoSimDecisao if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVotoSimDecisao = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultVotoSimDecisao).toEqual(new VotoSimDecisao());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as VotoSimDecisao })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVotoSimDecisao = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVotoSimDecisao).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
