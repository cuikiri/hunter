import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DecisaoService } from '../service/decisao.service';

import { DecisaoComponent } from './decisao.component';

describe('Decisao Management Component', () => {
  let comp: DecisaoComponent;
  let fixture: ComponentFixture<DecisaoComponent>;
  let service: DecisaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'decisao', component: DecisaoComponent }]), HttpClientTestingModule],
      declarations: [DecisaoComponent],
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
      .overrideTemplate(DecisaoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DecisaoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DecisaoService);

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
    expect(comp.decisaos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to decisaoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getDecisaoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getDecisaoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
