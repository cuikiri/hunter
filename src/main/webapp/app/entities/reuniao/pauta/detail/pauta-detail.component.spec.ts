import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PautaDetailComponent } from './pauta-detail.component';

describe('Pauta Management Detail Component', () => {
  let comp: PautaDetailComponent;
  let fixture: ComponentFixture<PautaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PautaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ pauta: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PautaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PautaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load pauta on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.pauta).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
