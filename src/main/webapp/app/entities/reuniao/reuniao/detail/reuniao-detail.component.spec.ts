import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReuniaoDetailComponent } from './reuniao-detail.component';

describe('Reuniao Management Detail Component', () => {
  let comp: ReuniaoDetailComponent;
  let fixture: ComponentFixture<ReuniaoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReuniaoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ reuniao: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ReuniaoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ReuniaoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load reuniao on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.reuniao).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
