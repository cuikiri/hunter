import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../agenda-colaborador.test-samples';

import { AgendaColaboradorFormService } from './agenda-colaborador-form.service';

describe('AgendaColaborador Form Service', () => {
  let service: AgendaColaboradorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaColaboradorFormService);
  });

  describe('Service methods', () => {
    describe('createAgendaColaboradorFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAgendaColaboradorFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            obs: expect.any(Object),
            periodoDuracao: expect.any(Object),
            colaborador: expect.any(Object),
          })
        );
      });

      it('passing IAgendaColaborador should create a new form with FormGroup', () => {
        const formGroup = service.createAgendaColaboradorFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            obs: expect.any(Object),
            periodoDuracao: expect.any(Object),
            colaborador: expect.any(Object),
          })
        );
      });
    });

    describe('getAgendaColaborador', () => {
      it('should return NewAgendaColaborador for default AgendaColaborador initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAgendaColaboradorFormGroup(sampleWithNewData);

        const agendaColaborador = service.getAgendaColaborador(formGroup) as any;

        expect(agendaColaborador).toMatchObject(sampleWithNewData);
      });

      it('should return NewAgendaColaborador for empty AgendaColaborador initial value', () => {
        const formGroup = service.createAgendaColaboradorFormGroup();

        const agendaColaborador = service.getAgendaColaborador(formGroup) as any;

        expect(agendaColaborador).toMatchObject({});
      });

      it('should return IAgendaColaborador', () => {
        const formGroup = service.createAgendaColaboradorFormGroup(sampleWithRequiredData);

        const agendaColaborador = service.getAgendaColaborador(formGroup) as any;

        expect(agendaColaborador).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAgendaColaborador should not enable id FormControl', () => {
        const formGroup = service.createAgendaColaboradorFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAgendaColaborador should disable id FormControl', () => {
        const formGroup = service.createAgendaColaboradorFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
