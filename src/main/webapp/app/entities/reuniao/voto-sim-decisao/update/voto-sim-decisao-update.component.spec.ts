import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VotoSimDecisaoService } from '../service/voto-sim-decisao.service';
import { IVotoSimDecisao, VotoSimDecisao } from '../voto-sim-decisao.model';
import { IDecisao } from 'app/entities/reuniao/decisao/decisao.model';
import { DecisaoService } from 'app/entities/reuniao/decisao/service/decisao.service';

import { VotoSimDecisaoUpdateComponent } from './voto-sim-decisao-update.component';

describe('VotoSimDecisao Management Update Component', () => {
  let comp: VotoSimDecisaoUpdateComponent;
  let fixture: ComponentFixture<VotoSimDecisaoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let votoSimDecisaoService: VotoSimDecisaoService;
  let decisaoService: DecisaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [VotoSimDecisaoUpdateComponent],
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
      .overrideTemplate(VotoSimDecisaoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VotoSimDecisaoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    votoSimDecisaoService = TestBed.inject(VotoSimDecisaoService);
    decisaoService = TestBed.inject(DecisaoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Decisao query and add missing value', () => {
      const votoSimDecisao: IVotoSimDecisao = { id: 456 };
      const decisao: IDecisao = { id: 6295 };
      votoSimDecisao.decisao = decisao;

      const decisaoCollection: IDecisao[] = [{ id: 93854 }];
      jest.spyOn(decisaoService, 'query').mockReturnValue(of(new HttpResponse({ body: decisaoCollection })));
      const additionalDecisaos = [decisao];
      const expectedCollection: IDecisao[] = [...additionalDecisaos, ...decisaoCollection];
      jest.spyOn(decisaoService, 'addDecisaoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ votoSimDecisao });
      comp.ngOnInit();

      expect(decisaoService.query).toHaveBeenCalled();
      expect(decisaoService.addDecisaoToCollectionIfMissing).toHaveBeenCalledWith(decisaoCollection, ...additionalDecisaos);
      expect(comp.decisaosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const votoSimDecisao: IVotoSimDecisao = { id: 456 };
      const decisao: IDecisao = { id: 28432 };
      votoSimDecisao.decisao = decisao;

      activatedRoute.data = of({ votoSimDecisao });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(votoSimDecisao));
      expect(comp.decisaosSharedCollection).toContain(decisao);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<VotoSimDecisao>>();
      const votoSimDecisao = { id: 123 };
      jest.spyOn(votoSimDecisaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ votoSimDecisao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: votoSimDecisao }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(votoSimDecisaoService.update).toHaveBeenCalledWith(votoSimDecisao);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<VotoSimDecisao>>();
      const votoSimDecisao = new VotoSimDecisao();
      jest.spyOn(votoSimDecisaoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ votoSimDecisao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: votoSimDecisao }));
      saveSubject.complete();

      // THEN
      expect(votoSimDecisaoService.create).toHaveBeenCalledWith(votoSimDecisao);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<VotoSimDecisao>>();
      const votoSimDecisao = { id: 123 };
      jest.spyOn(votoSimDecisaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ votoSimDecisao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(votoSimDecisaoService.update).toHaveBeenCalledWith(votoSimDecisao);
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
