import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AcaoFormService } from './acao-form.service';
import { AcaoService } from '../service/acao.service';
import { IAcao } from '../acao.model';
import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';
import { ReuniaoService } from 'app/entities/reuniao/reuniao/service/reuniao.service';

import { AcaoUpdateComponent } from './acao-update.component';

describe('Acao Management Update Component', () => {
  let comp: AcaoUpdateComponent;
  let fixture: ComponentFixture<AcaoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let acaoFormService: AcaoFormService;
  let acaoService: AcaoService;
  let reuniaoService: ReuniaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AcaoUpdateComponent],
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
      .overrideTemplate(AcaoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AcaoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    acaoFormService = TestBed.inject(AcaoFormService);
    acaoService = TestBed.inject(AcaoService);
    reuniaoService = TestBed.inject(ReuniaoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Reuniao query and add missing value', () => {
      const acao: IAcao = { id: 456 };
      const reuniao: IReuniao = { id: 20110 };
      acao.reuniao = reuniao;

      const reuniaoCollection: IReuniao[] = [{ id: 8146 }];
      jest.spyOn(reuniaoService, 'query').mockReturnValue(of(new HttpResponse({ body: reuniaoCollection })));
      const additionalReuniaos = [reuniao];
      const expectedCollection: IReuniao[] = [...additionalReuniaos, ...reuniaoCollection];
      jest.spyOn(reuniaoService, 'addReuniaoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ acao });
      comp.ngOnInit();

      expect(reuniaoService.query).toHaveBeenCalled();
      expect(reuniaoService.addReuniaoToCollectionIfMissing).toHaveBeenCalledWith(
        reuniaoCollection,
        ...additionalReuniaos.map(expect.objectContaining)
      );
      expect(comp.reuniaosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const acao: IAcao = { id: 456 };
      const reuniao: IReuniao = { id: 10151 };
      acao.reuniao = reuniao;

      activatedRoute.data = of({ acao });
      comp.ngOnInit();

      expect(comp.reuniaosSharedCollection).toContain(reuniao);
      expect(comp.acao).toEqual(acao);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAcao>>();
      const acao = { id: 123 };
      jest.spyOn(acaoFormService, 'getAcao').mockReturnValue(acao);
      jest.spyOn(acaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ acao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: acao }));
      saveSubject.complete();

      // THEN
      expect(acaoFormService.getAcao).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(acaoService.update).toHaveBeenCalledWith(expect.objectContaining(acao));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAcao>>();
      const acao = { id: 123 };
      jest.spyOn(acaoFormService, 'getAcao').mockReturnValue({ id: null });
      jest.spyOn(acaoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ acao: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: acao }));
      saveSubject.complete();

      // THEN
      expect(acaoFormService.getAcao).toHaveBeenCalled();
      expect(acaoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAcao>>();
      const acao = { id: 123 };
      jest.spyOn(acaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ acao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(acaoService.update).toHaveBeenCalled();
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
