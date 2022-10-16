import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DecisaoFormService } from './decisao-form.service';
import { DecisaoService } from '../service/decisao.service';
import { IDecisao } from '../decisao.model';
import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';
import { ReuniaoService } from 'app/entities/reuniao/reuniao/service/reuniao.service';

import { DecisaoUpdateComponent } from './decisao-update.component';

describe('Decisao Management Update Component', () => {
  let comp: DecisaoUpdateComponent;
  let fixture: ComponentFixture<DecisaoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let decisaoFormService: DecisaoFormService;
  let decisaoService: DecisaoService;
  let reuniaoService: ReuniaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DecisaoUpdateComponent],
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
      .overrideTemplate(DecisaoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DecisaoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    decisaoFormService = TestBed.inject(DecisaoFormService);
    decisaoService = TestBed.inject(DecisaoService);
    reuniaoService = TestBed.inject(ReuniaoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Reuniao query and add missing value', () => {
      const decisao: IDecisao = { id: 456 };
      const reuniao: IReuniao = { id: 11818 };
      decisao.reuniao = reuniao;

      const reuniaoCollection: IReuniao[] = [{ id: 58508 }];
      jest.spyOn(reuniaoService, 'query').mockReturnValue(of(new HttpResponse({ body: reuniaoCollection })));
      const additionalReuniaos = [reuniao];
      const expectedCollection: IReuniao[] = [...additionalReuniaos, ...reuniaoCollection];
      jest.spyOn(reuniaoService, 'addReuniaoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ decisao });
      comp.ngOnInit();

      expect(reuniaoService.query).toHaveBeenCalled();
      expect(reuniaoService.addReuniaoToCollectionIfMissing).toHaveBeenCalledWith(
        reuniaoCollection,
        ...additionalReuniaos.map(expect.objectContaining)
      );
      expect(comp.reuniaosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const decisao: IDecisao = { id: 456 };
      const reuniao: IReuniao = { id: 31097 };
      decisao.reuniao = reuniao;

      activatedRoute.data = of({ decisao });
      comp.ngOnInit();

      expect(comp.reuniaosSharedCollection).toContain(reuniao);
      expect(comp.decisao).toEqual(decisao);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDecisao>>();
      const decisao = { id: 123 };
      jest.spyOn(decisaoFormService, 'getDecisao').mockReturnValue(decisao);
      jest.spyOn(decisaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ decisao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: decisao }));
      saveSubject.complete();

      // THEN
      expect(decisaoFormService.getDecisao).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(decisaoService.update).toHaveBeenCalledWith(expect.objectContaining(decisao));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDecisao>>();
      const decisao = { id: 123 };
      jest.spyOn(decisaoFormService, 'getDecisao').mockReturnValue({ id: null });
      jest.spyOn(decisaoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ decisao: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: decisao }));
      saveSubject.complete();

      // THEN
      expect(decisaoFormService.getDecisao).toHaveBeenCalled();
      expect(decisaoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDecisao>>();
      const decisao = { id: 123 };
      jest.spyOn(decisaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ decisao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(decisaoService.update).toHaveBeenCalled();
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
