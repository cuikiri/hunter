import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../foto-exame-medico.test-samples';

import { FotoExameMedicoFormService } from './foto-exame-medico-form.service';

describe('FotoExameMedico Form Service', () => {
  let service: FotoExameMedicoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoExameMedicoFormService);
  });

  describe('Service methods', () => {
    describe('createFotoExameMedicoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFotoExameMedicoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            foto: expect.any(Object),
            exameMedico: expect.any(Object),
          })
        );
      });

      it('passing IFotoExameMedico should create a new form with FormGroup', () => {
        const formGroup = service.createFotoExameMedicoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            foto: expect.any(Object),
            exameMedico: expect.any(Object),
          })
        );
      });
    });

    describe('getFotoExameMedico', () => {
      it('should return NewFotoExameMedico for default FotoExameMedico initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFotoExameMedicoFormGroup(sampleWithNewData);

        const fotoExameMedico = service.getFotoExameMedico(formGroup) as any;

        expect(fotoExameMedico).toMatchObject(sampleWithNewData);
      });

      it('should return NewFotoExameMedico for empty FotoExameMedico initial value', () => {
        const formGroup = service.createFotoExameMedicoFormGroup();

        const fotoExameMedico = service.getFotoExameMedico(formGroup) as any;

        expect(fotoExameMedico).toMatchObject({});
      });

      it('should return IFotoExameMedico', () => {
        const formGroup = service.createFotoExameMedicoFormGroup(sampleWithRequiredData);

        const fotoExameMedico = service.getFotoExameMedico(formGroup) as any;

        expect(fotoExameMedico).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFotoExameMedico should not enable id FormControl', () => {
        const formGroup = service.createFotoExameMedicoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFotoExameMedico should disable id FormControl', () => {
        const formGroup = service.createFotoExameMedicoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
