import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../religiao.test-samples';

import { ReligiaoFormService } from './religiao-form.service';

describe('Religiao Form Service', () => {
  let service: ReligiaoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReligiaoFormService);
  });

  describe('Service methods', () => {
    describe('createReligiaoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createReligiaoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            descricao: expect.any(Object),
          })
        );
      });

      it('passing IReligiao should create a new form with FormGroup', () => {
        const formGroup = service.createReligiaoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            descricao: expect.any(Object),
          })
        );
      });
    });

    describe('getReligiao', () => {
      it('should return NewReligiao for default Religiao initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createReligiaoFormGroup(sampleWithNewData);

        const religiao = service.getReligiao(formGroup) as any;

        expect(religiao).toMatchObject(sampleWithNewData);
      });

      it('should return NewReligiao for empty Religiao initial value', () => {
        const formGroup = service.createReligiaoFormGroup();

        const religiao = service.getReligiao(formGroup) as any;

        expect(religiao).toMatchObject({});
      });

      it('should return IReligiao', () => {
        const formGroup = service.createReligiaoFormGroup(sampleWithRequiredData);

        const religiao = service.getReligiao(formGroup) as any;

        expect(religiao).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IReligiao should not enable id FormControl', () => {
        const formGroup = service.createReligiaoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewReligiao should disable id FormControl', () => {
        const formGroup = service.createReligiaoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
