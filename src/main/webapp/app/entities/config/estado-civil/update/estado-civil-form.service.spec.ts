import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../estado-civil.test-samples';

import { EstadoCivilFormService } from './estado-civil-form.service';

describe('EstadoCivil Form Service', () => {
  let service: EstadoCivilFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoCivilFormService);
  });

  describe('Service methods', () => {
    describe('createEstadoCivilFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEstadoCivilFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            descricao: expect.any(Object),
          })
        );
      });

      it('passing IEstadoCivil should create a new form with FormGroup', () => {
        const formGroup = service.createEstadoCivilFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            descricao: expect.any(Object),
          })
        );
      });
    });

    describe('getEstadoCivil', () => {
      it('should return NewEstadoCivil for default EstadoCivil initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEstadoCivilFormGroup(sampleWithNewData);

        const estadoCivil = service.getEstadoCivil(formGroup) as any;

        expect(estadoCivil).toMatchObject(sampleWithNewData);
      });

      it('should return NewEstadoCivil for empty EstadoCivil initial value', () => {
        const formGroup = service.createEstadoCivilFormGroup();

        const estadoCivil = service.getEstadoCivil(formGroup) as any;

        expect(estadoCivil).toMatchObject({});
      });

      it('should return IEstadoCivil', () => {
        const formGroup = service.createEstadoCivilFormGroup(sampleWithRequiredData);

        const estadoCivil = service.getEstadoCivil(formGroup) as any;

        expect(estadoCivil).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEstadoCivil should not enable id FormControl', () => {
        const formGroup = service.createEstadoCivilFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEstadoCivil should disable id FormControl', () => {
        const formGroup = service.createEstadoCivilFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
