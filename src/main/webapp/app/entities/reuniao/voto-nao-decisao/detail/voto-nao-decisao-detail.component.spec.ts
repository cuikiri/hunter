import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VotoNaoDecisaoDetailComponent } from './voto-nao-decisao-detail.component';

describe('VotoNaoDecisao Management Detail Component', () => {
  let comp: VotoNaoDecisaoDetailComponent;
  let fixture: ComponentFixture<VotoNaoDecisaoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotoNaoDecisaoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ votoNaoDecisao: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(VotoNaoDecisaoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(VotoNaoDecisaoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load votoNaoDecisao on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.votoNaoDecisao).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
