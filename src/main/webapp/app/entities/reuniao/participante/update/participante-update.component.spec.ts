import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ParticipanteService } from '../service/participante.service';
import { IParticipante, Participante } from '../participante.model';
import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';
import { ReuniaoService } from 'app/entities/reuniao/reuniao/service/reuniao.service';

import { ParticipanteUpdateComponent } from './participante-update.component';

describe('Participante Management Update Component', () => {
  let comp: ParticipanteUpdateComponent;
  let fixture: ComponentFixture<ParticipanteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
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
      expect(reuniaoService.addReuniaoToCollectionIfMissing).toHaveBeenCalledWith(reuniaoCollection, ...additionalReuniaos);
      expect(comp.reuniaosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const participante: IParticipante = { id: 456 };
      const reuniao: IReuniao = { id: 12063 };
      participante.reuniao = reuniao;

      activatedRoute.data = of({ participante });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(participante));
      expect(comp.reuniaosSharedCollection).toContain(reuniao);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Participante>>();
      const participante = { id: 123 };
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
      expect(comp.previousState).toHaveBeenCalled();
      expect(participanteService.update).toHaveBeenCalledWith(participante);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Participante>>();
      const participante = new Participante();
      jest.spyOn(participanteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ participante });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: participante }));
      saveSubject.complete();

      // THEN
      expect(participanteService.create).toHaveBeenCalledWith(participante);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Participante>>();
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
      expect(participanteService.update).toHaveBeenCalledWith(participante);
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
