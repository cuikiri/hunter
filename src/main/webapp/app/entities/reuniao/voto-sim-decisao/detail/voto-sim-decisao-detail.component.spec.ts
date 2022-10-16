import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VotoSimDecisaoDetailComponent } from './voto-sim-decisao-detail.component';

describe('VotoSimDecisao Management Detail Component', () => {
  let comp: VotoSimDecisaoDetailComponent;
  let fixture: ComponentFixture<VotoSimDecisaoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotoSimDecisaoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ votoSimDecisao: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(VotoSimDecisaoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(VotoSimDecisaoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load votoSimDecisao on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.votoSimDecisao).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
