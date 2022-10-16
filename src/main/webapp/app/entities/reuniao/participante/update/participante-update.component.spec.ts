import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ParticipanteFormService } from './participante-form.service';
import { ParticipanteService } from '../service/participante.service';
import { IParticipante } from '../participante.model';
import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';
import { ReuniaoService } from 'app/entities/reuniao/reuniao/service/reuniao.service';

import { ParticipanteUpdateComponent } from './participante-update.component';

describe('Participante Management Update Component', () => {
  let comp: ParticipanteUpdateComponent;
  let fixture: ComponentFixture<ParticipanteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let participanteFormService: ParticipanteFormService;
  let participanteService: ParticipanteService;
  let reuniaoService: ReuniaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ParticipanteUpdateComponent],
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
      .overrideTemplate(ParticipanteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ParticipanteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    participanteFormService = TestBed.inject(ParticipanteFormService);
    participanteService = TestBed.inject(ParticipanteService);
    reuniaoService = TestBed.inject(ReuniaoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Reuniao query and add missing value', () => {
      const participante: IParticipante = { id: 456 };
      const reuniao: IReuniao = { id: 72775 };
      participante.reuniao = reuniao;

      const reuniaoCollection: IReuniao[] = [{ id: 91797 }];
      jest.spyOn(reuniaoService, 'query').mockReturnValue(of(new HttpResponse({ body: reuniaoCollection })));
      const additionalReuniaos = [reuniao];
      const expectedCollection: IReuniao[] = [...additionalReuniaos, ...reuniaoCollection];
      jest.spyOn(reuniaoService, 'addReuniaoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ participante });
      comp.ngOnInit();

      expect(reuniaoService.query).toHaveBeenCalled();
      expect(reuniaoService.addReuniaoToCollectionIfMissing).toHaveBeenCalledWith(
        reuniaoCollection,
        ...additionalReuniaos.map(expect.objectContaining)
      );
      expect(comp.reuniaosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const participante: IParticipante = { id: 456 };
      const reuniao: IReuniao = { id: 12063 };
      participante.reuniao = reuniao;

      activatedRoute.data = of({ participante });
      comp.ngOnInit();

      expect(comp.reuniaosSharedCollection).toContain(reuniao);
      expect(comp.participante).toEqual(participante);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParticipante>>();
      const participante = { id: 123 };
      jest.spyOn(participanteFormService, 'getParticipante').mockReturnValue(participante);
      jest.spyOn(participanteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ participante });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: participante }));
      saveSubject.complete();

      // THEN
      expect(participanteFormService.getParticipante).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(participanteService.update).toHaveBeenCalledWith(expect.objectContaining(participante));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParticipante>>();
      const participante = { id: 123 };
      jest.spyOn(participanteFormService, 'getParticipante').mockReturnValue({ id: null });
      jest.spyOn(participanteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ participante: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: participante }));
      saveSubject.complete();

      // THEN
      expect(participanteFormService.getParticipante).toHaveBeenCalled();
      expect(participanteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParticipante>>();
      const participante = { id: 123 };
      jest.spyOn(participanteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ participante });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(participanteService.update).toHaveBeenCalled();
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
