import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { VotoNaoDecisaoService } from '../service/voto-nao-decisao.service';

import { VotoNaoDecisaoComponent } from './voto-nao-decisao.component';

describe('VotoNaoDecisao Management Component', () => {
  let comp: VotoNaoDecisaoComponent;
  let fixture: ComponentFixture<VotoNaoDecisaoComponent>;
  let service: VotoNaoDecisaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'voto-nao-decisao', component: VotoNaoDecisaoComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [VotoNaoDecisaoComponent],
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
      .overrideTemplate(VotoNaoDecisaoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VotoNaoDecisaoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VotoNaoDecisaoService);

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
    expect(comp.votoNaoDecisaos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to votoNaoDecisaoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getVotoNaoDecisaoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getVotoNaoDecisaoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
