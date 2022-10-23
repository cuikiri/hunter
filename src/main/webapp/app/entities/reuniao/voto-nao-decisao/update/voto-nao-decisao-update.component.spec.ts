import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VotoNaoDecisaoService } from '../service/voto-nao-decisao.service';
import { IVotoNaoDecisao, VotoNaoDecisao } from '../voto-nao-decisao.model';
import { IDecisao } from 'app/entities/reuniao/decisao/decisao.model';
import { DecisaoService } from 'app/entities/reuniao/decisao/service/decisao.service';

import { VotoNaoDecisaoUpdateComponent } from './voto-nao-decisao-update.component';

describe('VotoNaoDecisao Management Update Component', () => {
  let comp: VotoNaoDecisaoUpdateComponent;
  let fixture: ComponentFixture<VotoNaoDecisaoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
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
      expect(decisaoService.addDecisaoToCollectionIfMissing).toHaveBeenCalledWith(decisaoCollection, ...additionalDecisaos);
      expect(comp.decisaosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const votoNaoDecisao: IVotoNaoDecisao = { id: 456 };
      const decisao: IDecisao = { id: 79430 };
      votoNaoDecisao.decisao = decisao;

      activatedRoute.data = of({ votoNaoDecisao });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(votoNaoDecisao));
      expect(comp.decisaosSharedCollection).toContain(decisao);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<VotoNaoDecisao>>();
      const votoNaoDecisao = { id: 123 };
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
      expect(comp.previousState).toHaveBeenCalled();
      expect(votoNaoDecisaoService.update).toHaveBeenCalledWith(votoNaoDecisao);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<VotoNaoDecisao>>();
      const votoNaoDecisao = new VotoNaoDecisao();
      jest.spyOn(votoNaoDecisaoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ votoNaoDecisao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: votoNaoDecisao }));
      saveSubject.complete();

      // THEN
      expect(votoNaoDecisaoService.create).toHaveBeenCalledWith(votoNaoDecisao);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<VotoNaoDecisao>>();
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
      expect(votoNaoDecisaoService.update).toHaveBeenCalledWith(votoNaoDecisao);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackDecisaoById', () => {
      it('Should return tracked Decisao primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDecisaoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
