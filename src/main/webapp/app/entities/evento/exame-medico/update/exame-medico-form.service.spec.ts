import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../exame-medico.test-samples';

import { ExameMedicoFormService } from './exame-medico-form.service';

describe('ExameMedico Form Service', () => {
  let service: ExameMedicoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExameMedicoFormService);
  });

  describe('Service methods', () => {
    describe('createExameMedicoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createExameMedicoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            data: expect.any(Object),
            nomeMedico: expect.any(Object),
            crmMedico: expect.any(Object),
            resumo: expect.any(Object),
            obs: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });

      it('passing IExameMedico should create a new form with FormGroup', () => {
        const formGroup = service.createExameMedicoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            data: expect.any(Object),
            nomeMedico: expect.any(Object),
            crmMedico: expect.any(Object),
            resumo: expect.any(Object),
            obs: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });
    });

    describe('getExameMedico', () => {
      it('should return NewExameMedico for default ExameMedico initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createExameMedicoFormGroup(sampleWithNewData);

        const exameMedico = service.getExameMedico(formGroup) as any;

        expect(exameMedico).toMatchObject(sampleWithNewData);
      });

      it('should return NewExameMedico for empty ExameMedico initial value', () => {
        const formGroup = service.createExameMedicoFormGroup();

        const exameMedico = service.getExameMedico(formGroup) as any;

        expect(exameMedico).toMatchObject({});
      });

      it('should return IExameMedico', () => {
        const formGroup = service.createExameMedicoFormGroup(sampleWithRequiredData);

        const exameMedico = service.getExameMedico(formGroup) as any;

        expect(exameMedico).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IExameMedico should not enable id FormControl', () => {
        const formGroup = service.createExameMedicoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewExameMedico should disable id FormControl', () => {
        const formGroup = service.createExameMedicoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
