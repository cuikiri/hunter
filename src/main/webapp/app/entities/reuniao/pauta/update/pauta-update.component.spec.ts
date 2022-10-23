import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PautaService } from '../service/pauta.service';
import { IPauta, Pauta } from '../pauta.model';
import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';
import { ReuniaoService } from 'app/entities/reuniao/reuniao/service/reuniao.service';

import { PautaUpdateComponent } from './pauta-update.component';

describe('Pauta Management Update Component', () => {
  let comp: PautaUpdateComponent;
  let fixture: ComponentFixture<PautaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
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
      expect(reuniaoService.addReuniaoToCollectionIfMissing).toHaveBeenCalledWith(reuniaoCollection, ...additionalReuniaos);
      expect(comp.reuniaosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pauta: IPauta = { id: 456 };
      const reuniao: IReuniao = { id: 65402 };
      pauta.reuniao = reuniao;

      activatedRoute.data = of({ pauta });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(pauta));
      expect(comp.reuniaosSharedCollection).toContain(reuniao);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Pauta>>();
      const pauta = { id: 123 };
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
      expect(comp.previousState).toHaveBeenCalled();
      expect(pautaService.update).toHaveBeenCalledWith(pauta);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Pauta>>();
      const pauta = new Pauta();
      jest.spyOn(pautaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pauta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pauta }));
      saveSubject.complete();

      // THEN
      expect(pautaService.create).toHaveBeenCalledWith(pauta);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Pauta>>();
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
      expect(pautaService.update).toHaveBeenCalledWith(pauta);
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
