import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tipo-pagar.test-samples';

import { TipoPagarFormService } from './tipo-pagar-form.service';

describe('TipoPagar Form Service', () => {
  let service: TipoPagarFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPagarFormService);
  });

  describe('Service methods', () => {
    describe('createTipoPagarFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoPagarFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
          })
        );
      });

      it('passing ITipoPagar should create a new form with FormGroup', () => {
        const formGroup = service.createTipoPagarFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
          })
        );
      });
    });

    describe('getTipoPagar', () => {
      it('should return NewTipoPagar for default TipoPagar initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTipoPagarFormGroup(sampleWithNewData);

        const tipoPagar = service.getTipoPagar(formGroup) as any;

        expect(tipoPagar).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoPagar for empty TipoPagar initial value', () => {
        const formGroup = service.createTipoPagarFormGroup();

        const tipoPagar = service.getTipoPagar(formGroup) as any;

        expect(tipoPagar).toMatchObject({});
      });

      it('should return ITipoPagar', () => {
        const formGroup = service.createTipoPagarFormGroup(sampleWithRequiredData);

        const tipoPagar = service.getTipoPagar(formGroup) as any;

        expect(tipoPagar).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoPagar should not enable id FormControl', () => {
        const formGroup = service.createTipoPagarFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoPagar should disable id FormControl', () => {
        const formGroup = service.createTipoPagarFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
