import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { VotoSimDecisaoService } from '../service/voto-sim-decisao.service';

import { VotoSimDecisaoComponent } from './voto-sim-decisao.component';

describe('VotoSimDecisao Management Component', () => {
  let comp: VotoSimDecisaoComponent;
  let fixture: ComponentFixture<VotoSimDecisaoComponent>;
  let service: VotoSimDecisaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'voto-sim-decisao', component: VotoSimDecisaoComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [VotoSimDecisaoComponent],
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
      .overrideTemplate(VotoSimDecisaoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VotoSimDecisaoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VotoSimDecisaoService);

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
    expect(comp.votoSimDecisaos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to votoSimDecisaoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getVotoSimDecisaoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getVotoSimDecisaoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
