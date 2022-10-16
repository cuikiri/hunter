import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../periodo-duracao.test-samples';

import { PeriodoDuracaoFormService } from './periodo-duracao-form.service';

describe('PeriodoDuracao Form Service', () => {
  let service: PeriodoDuracaoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodoDuracaoFormService);
  });

  describe('Service methods', () => {
    describe('createPeriodoDuracaoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPeriodoDuracaoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            dataInicio: expect.any(Object),
            dataFim: expect.any(Object),
            horaInicio: expect.any(Object),
            horaFim: expect.any(Object),
            obs: expect.any(Object),
          })
        );
      });

      it('passing IPeriodoDuracao should create a new form with FormGroup', () => {
        const formGroup = service.createPeriodoDuracaoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            dataInicio: expect.any(Object),
            dataFim: expect.any(Object),
            horaInicio: expect.any(Object),
            horaFim: expect.any(Object),
            obs: expect.any(Object),
          })
        );
      });
    });

    describe('getPeriodoDuracao', () => {
      it('should return NewPeriodoDuracao for default PeriodoDuracao initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPeriodoDuracaoFormGroup(sampleWithNewData);

        const periodoDuracao = service.getPeriodoDuracao(formGroup) as any;

        expect(periodoDuracao).toMatchObject(sampleWithNewData);
      });

      it('should return NewPeriodoDuracao for empty PeriodoDuracao initial value', () => {
        const formGroup = service.createPeriodoDuracaoFormGroup();

        const periodoDuracao = service.getPeriodoDuracao(formGroup) as any;

        expect(periodoDuracao).toMatchObject({});
      });

      it('should return IPeriodoDuracao', () => {
        const formGroup = service.createPeriodoDuracaoFormGroup(sampleWithRequiredData);

        const periodoDuracao = service.getPeriodoDuracao(formGroup) as any;

        expect(periodoDuracao).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPeriodoDuracao should not enable id FormControl', () => {
        const formGroup = service.createPeriodoDuracaoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPeriodoDuracao should disable id FormControl', () => {
        const formGroup = service.createPeriodoDuracaoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
