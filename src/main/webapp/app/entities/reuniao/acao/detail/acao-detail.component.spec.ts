import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AcaoDetailComponent } from './acao-detail.component';

describe('Acao Management Detail Component', () => {
  let comp: AcaoDetailComponent;
  let fixture: ComponentFixture<AcaoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcaoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ acao: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AcaoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AcaoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load acao on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.acao).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
