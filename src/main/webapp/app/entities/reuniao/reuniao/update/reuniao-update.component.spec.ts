import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ReuniaoService } from '../service/reuniao.service';
import { IReuniao, Reuniao } from '../reuniao.model';

import { ReuniaoUpdateComponent } from './reuniao-update.component';

describe('Reuniao Management Update Component', () => {
  let comp: ReuniaoUpdateComponent;
  let fixture: ComponentFixture<ReuniaoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reuniaoService: ReuniaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ReuniaoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ReuniaoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReuniaoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reuniaoService = TestBed.inject(ReuniaoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const reuniao: IReuniao = { id: 456 };

      activatedRoute.data = of({ reuniao });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(reuniao));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Reuniao>>();
      const reuniao = { id: 123 };
      jest.spyOn(reuniaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reuniao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reuniao }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(reuniaoService.update).toHaveBeenCalledWith(reuniao);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Reuniao>>();
      const reuniao = new Reuniao();
      jest.spyOn(reuniaoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reuniao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reuniao }));
      saveSubject.complete();

      // THEN
      expect(reuniaoService.create).toHaveBeenCalledWith(reuniao);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Reuniao>>();
      const reuniao = { id: 123 };
      jest.spyOn(reuniaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reuniao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reuniaoService.update).toHaveBeenCalledWith(reuniao);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
