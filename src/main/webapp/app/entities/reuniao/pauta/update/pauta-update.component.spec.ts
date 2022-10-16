import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PautaFormService } from './pauta-form.service';
import { PautaService } from '../service/pauta.service';
import { IPauta } from '../pauta.model';
import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';
import { ReuniaoService } from 'app/entities/reuniao/reuniao/service/reuniao.service';

import { PautaUpdateComponent } from './pauta-update.component';

describe('Pauta Management Update Component', () => {
  let comp: PautaUpdateComponent;
  let fixture: ComponentFixture<PautaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pautaFormService: PautaFormService;
  let pautaService: PautaService;
  let reuniaoService: ReuniaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PautaUpdateComponent],
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
      .overrideTemplate(PautaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PautaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pautaFormService = TestBed.inject(PautaFormService);
    pautaService = TestBed.inject(PautaService);
    reuniaoService = TestBed.inject(ReuniaoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Reuniao query and add missing value', () => {
      const pauta: IPauta = { id: 456 };
      const reuniao: IReuniao = { id: 60326 };
      pauta.reuniao = reuniao;

      const reuniaoCollection: IReuniao[] = [{ id: 66538 }];
      jest.spyOn(reuniaoService, 'query').mockReturnValue(of(new HttpResponse({ body: reuniaoCollection })));
      const additionalReuniaos = [reuniao];
      const expectedCollection: IReuniao[] = [...additionalReuniaos, ...reuniaoCollection];
      jest.spyOn(reuniaoService, 'addReuniaoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pauta });
      comp.ngOnInit();

      expect(reuniaoService.query).toHaveBeenCalled();
      expect(reuniaoService.addReuniaoToCollectionIfMissing).toHaveBeenCalledWith(
        reuniaoCollection,
        ...additionalReuniaos.map(expect.objectContaining)
      );
      expect(comp.reuniaosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pauta: IPauta = { id: 456 };
      const reuniao: IReuniao = { id: 65402 };
      pauta.reuniao = reuniao;

      activatedRoute.data = of({ pauta });
      comp.ngOnInit();

      expect(comp.reuniaosSharedCollection).toContain(reuniao);
      expect(comp.pauta).toEqual(pauta);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPauta>>();
      const pauta = { id: 123 };
      jest.spyOn(pautaFormService, 'getPauta').mockReturnValue(pauta);
      jest.spyOn(pautaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pauta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pauta }));
      saveSubject.complete();

      // THEN
      expect(pautaFormService.getPauta).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(pautaService.update).toHaveBeenCalledWith(expect.objectContaining(pauta));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPauta>>();
      const pauta = { id: 123 };
      jest.spyOn(pautaFormService, 'getPauta').mockReturnValue({ id: null });
      jest.spyOn(pautaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pauta: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pauta }));
      saveSubject.complete();

      // THEN
      expect(pautaFormService.getPauta).toHaveBeenCalled();
      expect(pautaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPauta>>();
      const pauta = { id: 123 };
      jest.spyOn(pautaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pauta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pautaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareReuniao', () => {
      it('Should forward to reuniaoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(reuniaoService, 'compareReuniao');
        comp.compareReuniao(entity, entity2);
        expect(reuniaoService.compareReuniao).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
