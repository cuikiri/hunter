import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VotoNaoDecisaoFormService } from './voto-nao-decisao-form.service';
import { VotoNaoDecisaoService } from '../service/voto-nao-decisao.service';
import { IVotoNaoDecisao } from '../voto-nao-decisao.model';
import { IDecisao } from 'app/entities/reuniao/decisao/decisao.model';
import { DecisaoService } from 'app/entities/reuniao/decisao/service/decisao.service';

import { VotoNaoDecisaoUpdateComponent } from './voto-nao-decisao-update.component';

describe('VotoNaoDecisao Management Update Component', () => {
  let comp: VotoNaoDecisaoUpdateComponent;
  let fixture: ComponentFixture<VotoNaoDecisaoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let votoNaoDecisaoFormService: VotoNaoDecisaoFormService;
  let votoNaoDecisaoService: VotoNaoDecisaoService;
  let decisaoService: DecisaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [VotoNaoDecisaoUpdateComponent],
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
      .overrideTemplate(VotoNaoDecisaoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VotoNaoDecisaoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    votoNaoDecisaoFormService = TestBed.inject(VotoNaoDecisaoFormService);
    votoNaoDecisaoService = TestBed.inject(VotoNaoDecisaoService);
    decisaoService = TestBed.inject(DecisaoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Decisao query and add missing value', () => {
      const votoNaoDecisao: IVotoNaoDecisao = { id: 456 };
      const decisao: IDecisao = { id: 42945 };
      votoNaoDecisao.decisao = decisao;

      const decisaoCollection: IDecisao[] = [{ id: 38354 }];
      jest.spyOn(decisaoService, 'query').mockReturnValue(of(new HttpResponse({ body: decisaoCollection })));
      const additionalDecisaos = [decisao];
      const expectedCollection: IDecisao[] = [...additionalDecisaos, ...decisaoCollection];
      jest.spyOn(decisaoService, 'addDecisaoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ votoNaoDecisao });
      comp.ngOnInit();

      expect(decisaoService.query).toHaveBeenCalled();
      expect(decisaoService.addDecisaoToCollectionIfMissing).toHaveBeenCalledWith(
        decisaoCollection,
        ...additionalDecisaos.map(expect.objectContaining)
      );
      expect(comp.decisaosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const votoNaoDecisao: IVotoNaoDecisao = { id: 456 };
      const decisao: IDecisao = { id: 79430 };
      votoNaoDecisao.decisao = decisao;

      activatedRoute.data = of({ votoNaoDecisao });
      comp.ngOnInit();

      expect(comp.decisaosSharedCollection).toContain(decisao);
      expect(comp.votoNaoDecisao).toEqual(votoNaoDecisao);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVotoNaoDecisao>>();
      const votoNaoDecisao = { id: 123 };
      jest.spyOn(votoNaoDecisaoFormService, 'getVotoNaoDecisao').mockReturnValue(votoNaoDecisao);
      jest.spyOn(votoNaoDecisaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ votoNaoDecisao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: votoNaoDecisao }));
      saveSubject.complete();

      // THEN
      expect(votoNaoDecisaoFormService.getVotoNaoDecisao).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(votoNaoDecisaoService.update).toHaveBeenCalledWith(expect.objectContaining(votoNaoDecisao));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVotoNaoDecisao>>();
      const votoNaoDecisao = { id: 123 };
      jest.spyOn(votoNaoDecisaoFormService, 'getVotoNaoDecisao').mockReturnValue({ id: null });
      jest.spyOn(votoNaoDecisaoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ votoNaoDecisao: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: votoNaoDecisao }));
      saveSubject.complete();

      // THEN
      expect(votoNaoDecisaoFormService.getVotoNaoDecisao).toHaveBeenCalled();
      expect(votoNaoDecisaoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVotoNaoDecisao>>();
      const votoNaoDecisao = { id: 123 };
      jest.spyOn(votoNaoDecisaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ votoNaoDecisao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(votoNaoDecisaoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDecisao', () => {
      it('Should forward to decisaoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(decisaoService, 'compareDecisao');
        comp.compareDecisao(entity, entity2);
        expect(decisaoService.compareDecisao).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
