import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../caracteristicas-psiquicas.test-samples';

import { CaracteristicasPsiquicasFormService } from './caracteristicas-psiquicas-form.service';

describe('CaracteristicasPsiquicas Form Service', () => {
  let service: CaracteristicasPsiquicasFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaracteristicasPsiquicasFormService);
  });

  describe('Service methods', () => {
    describe('createCaracteristicasPsiquicasFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCaracteristicasPsiquicasFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });

      it('passing ICaracteristicasPsiquicas should create a new form with FormGroup', () => {
        const formGroup = service.createCaracteristicasPsiquicasFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });
    });

    describe('getCaracteristicasPsiquicas', () => {
      it('should return NewCaracteristicasPsiquicas for default CaracteristicasPsiquicas initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCaracteristicasPsiquicasFormGroup(sampleWithNewData);

        const caracteristicasPsiquicas = service.getCaracteristicasPsiquicas(formGroup) as any;

        expect(caracteristicasPsiquicas).toMatchObject(sampleWithNewData);
      });

      it('should return NewCaracteristicasPsiquicas for empty CaracteristicasPsiquicas initial value', () => {
        const formGroup = service.createCaracteristicasPsiquicasFormGroup();

        const caracteristicasPsiquicas = service.getCaracteristicasPsiquicas(formGroup) as any;

        expect(caracteristicasPsiquicas).toMatchObject({});
      });

      it('should return ICaracteristicasPsiquicas', () => {
        const formGroup = service.createCaracteristicasPsiquicasFormGroup(sampleWithRequiredData);

        const caracteristicasPsiquicas = service.getCaracteristicasPsiquicas(formGroup) as any;

        expect(caracteristicasPsiquicas).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICaracteristicasPsiquicas should not enable id FormControl', () => {
        const formGroup = service.createCaracteristicasPsiquicasFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCaracteristicasPsiquicas should disable id FormControl', () => {
        const formGroup = service.createCaracteristicasPsiquicasFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
