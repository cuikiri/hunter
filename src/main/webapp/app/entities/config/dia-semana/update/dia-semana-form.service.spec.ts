import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../dia-semana.test-samples';

import { DiaSemanaFormService } from './dia-semana-form.service';

describe('DiaSemana Form Service', () => {
  let service: DiaSemanaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaSemanaFormService);
  });

  describe('Service methods', () => {
    describe('createDiaSemanaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDiaSemanaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            obs: expect.any(Object),
            periodoDuracao: expect.any(Object),
          })
        );
      });

      it('passing IDiaSemana should create a new form with FormGroup', () => {
        const formGroup = service.createDiaSemanaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            obs: expect.any(Object),
            periodoDuracao: expect.any(Object),
          })
        );
      });
    });

    describe('getDiaSemana', () => {
      it('should return NewDiaSemana for default DiaSemana initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDiaSemanaFormGroup(sampleWithNewData);

        const diaSemana = service.getDiaSemana(formGroup) as any;

        expect(diaSemana).toMatchObject(sampleWithNewData);
      });

      it('should return NewDiaSemana for empty DiaSemana initial value', () => {
        const formGroup = service.createDiaSemanaFormGroup();

        const diaSemana = service.getDiaSemana(formGroup) as any;

        expect(diaSemana).toMatchObject({});
      });

      it('should return IDiaSemana', () => {
        const formGroup = service.createDiaSemanaFormGroup(sampleWithRequiredData);

        const diaSemana = service.getDiaSemana(formGroup) as any;

        expect(diaSemana).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDiaSemana should not enable id FormControl', () => {
        const formGroup = service.createDiaSemanaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDiaSemana should disable id FormControl', () => {
        const formGroup = service.createDiaSemanaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
