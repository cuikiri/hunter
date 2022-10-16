import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DecisaoDetailComponent } from './decisao-detail.component';

describe('Decisao Management Detail Component', () => {
  let comp: DecisaoDetailComponent;
  let fixture: ComponentFixture<DecisaoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecisaoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ decisao: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DecisaoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DecisaoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load decisao on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.decisao).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
