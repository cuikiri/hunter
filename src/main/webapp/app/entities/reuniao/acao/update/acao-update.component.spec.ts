import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AcaoService } from '../service/acao.service';
import { IAcao, Acao } from '../acao.model';
import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';
import { ReuniaoService } from 'app/entities/reuniao/reuniao/service/reuniao.service';

import { AcaoUpdateComponent } from './acao-update.component';

describe('Acao Management Update Component', () => {
  let comp: AcaoUpdateComponent;
  let fixture: ComponentFixture<AcaoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
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
      expect(reuniaoService.addReuniaoToCollectionIfMissing).toHaveBeenCalledWith(reuniaoCollection, ...additionalReuniaos);
      expect(comp.reuniaosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const acao: IAcao = { id: 456 };
      const reuniao: IReuniao = { id: 10151 };
      acao.reuniao = reuniao;

      activatedRoute.data = of({ acao });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(acao));
      expect(comp.reuniaosSharedCollection).toContain(reuniao);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Acao>>();
      const acao = { id: 123 };
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
      expect(comp.previousState).toHaveBeenCalled();
      expect(acaoService.update).toHaveBeenCalledWith(acao);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Acao>>();
      const acao = new Acao();
      jest.spyOn(acaoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ acao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: acao }));
      saveSubject.complete();

      // THEN
      expect(acaoService.create).toHaveBeenCalledWith(acao);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Acao>>();
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
      expect(acaoService.update).toHaveBeenCalledWith(acao);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackReuniaoById', () => {
      it('Should return tracked Reuniao primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackReuniaoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
