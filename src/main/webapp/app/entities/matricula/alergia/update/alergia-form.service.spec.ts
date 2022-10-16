import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../alergia.test-samples';

import { AlergiaFormService } from './alergia-form.service';

describe('Alergia Form Service', () => {
  let service: AlergiaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlergiaFormService);
  });

  describe('Service methods', () => {
    describe('createAlergiaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAlergiaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            sintoma: expect.any(Object),
            precaucoes: expect.any(Object),
            socorro: expect.any(Object),
            obs: expect.any(Object),
          })
        );
      });

      it('passing IAlergia should create a new form with FormGroup', () => {
        const formGroup = service.createAlergiaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            sintoma: expect.any(Object),
            precaucoes: expect.any(Object),
            socorro: expect.any(Object),
            obs: expect.any(Object),
          })
        );
      });
    });

    describe('getAlergia', () => {
      it('should return NewAlergia for default Alergia initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAlergiaFormGroup(sampleWithNewData);

        const alergia = service.getAlergia(formGroup) as any;

        expect(alergia).toMatchObject(sampleWithNewData);
      });

      it('should return NewAlergia for empty Alergia initial value', () => {
        const formGroup = service.createAlergiaFormGroup();

        const alergia = service.getAlergia(formGroup) as any;

        expect(alergia).toMatchObject({});
      });

      it('should return IAlergia', () => {
        const formGroup = service.createAlergiaFormGroup(sampleWithRequiredData);

        const alergia = service.getAlergia(formGroup) as any;

        expect(alergia).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAlergia should not enable id FormControl', () => {
        const formGroup = service.createAlergiaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAlergia should disable id FormControl', () => {
        const formGroup = service.createAlergiaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
