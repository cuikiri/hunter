import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DecisaoService } from '../service/decisao.service';
import { IDecisao, Decisao } from '../decisao.model';
import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';
import { ReuniaoService } from 'app/entities/reuniao/reuniao/service/reuniao.service';

import { DecisaoUpdateComponent } from './decisao-update.component';

describe('Decisao Management Update Component', () => {
  let comp: DecisaoUpdateComponent;
  let fixture: ComponentFixture<DecisaoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
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
      expect(reuniaoService.addReuniaoToCollectionIfMissing).toHaveBeenCalledWith(reuniaoCollection, ...additionalReuniaos);
      expect(comp.reuniaosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const decisao: IDecisao = { id: 456 };
      const reuniao: IReuniao = { id: 31097 };
      decisao.reuniao = reuniao;

      activatedRoute.data = of({ decisao });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(decisao));
      expect(comp.reuniaosSharedCollection).toContain(reuniao);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Decisao>>();
      const decisao = { id: 123 };
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
      expect(comp.previousState).toHaveBeenCalled();
      expect(decisaoService.update).toHaveBeenCalledWith(decisao);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Decisao>>();
      const decisao = new Decisao();
      jest.spyOn(decisaoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ decisao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: decisao }));
      saveSubject.complete();

      // THEN
      expect(decisaoService.create).toHaveBeenCalledWith(decisao);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Decisao>>();
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
      expect(decisaoService.update).toHaveBeenCalledWith(decisao);
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
