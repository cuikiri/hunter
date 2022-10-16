import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AcaoService } from '../service/acao.service';

import { AcaoComponent } from './acao.component';

describe('Acao Management Component', () => {
  let comp: AcaoComponent;
  let fixture: ComponentFixture<AcaoComponent>;
  let service: AcaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'acao', component: AcaoComponent }]), HttpClientTestingModule],
      declarations: [AcaoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(AcaoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AcaoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AcaoService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.acaos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to acaoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getAcaoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getAcaoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
