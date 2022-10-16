import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ReuniaoService } from '../service/reuniao.service';

import { ReuniaoComponent } from './reuniao.component';

describe('Reuniao Management Component', () => {
  let comp: ReuniaoComponent;
  let fixture: ComponentFixture<ReuniaoComponent>;
  let service: ReuniaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'reuniao', component: ReuniaoComponent }]), HttpClientTestingModule],
      declarations: [ReuniaoComponent],
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
      .overrideTemplate(ReuniaoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReuniaoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ReuniaoService);

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
    expect(comp.reuniaos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to reuniaoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getReuniaoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getReuniaoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
