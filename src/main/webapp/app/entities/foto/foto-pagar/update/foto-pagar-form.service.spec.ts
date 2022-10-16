import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../foto-pagar.test-samples';

import { FotoPagarFormService } from './foto-pagar-form.service';

describe('FotoPagar Form Service', () => {
  let service: FotoPagarFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoPagarFormService);
  });

  describe('Service methods', () => {
    describe('createFotoPagarFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFotoPagarFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
            pagar: expect.any(Object),
          })
        );
      });

      it('passing IFotoPagar should create a new form with FormGroup', () => {
        const formGroup = service.createFotoPagarFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
            pagar: expect.any(Object),
          })
        );
      });
    });

    describe('getFotoPagar', () => {
      it('should return NewFotoPagar for default FotoPagar initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFotoPagarFormGroup(sampleWithNewData);

        const fotoPagar = service.getFotoPagar(formGroup) as any;

        expect(fotoPagar).toMatchObject(sampleWithNewData);
      });

      it('should return NewFotoPagar for empty FotoPagar initial value', () => {
        const formGroup = service.createFotoPagarFormGroup();

        const fotoPagar = service.getFotoPagar(formGroup) as any;

        expect(fotoPagar).toMatchObject({});
      });

      it('should return IFotoPagar', () => {
        const formGroup = service.createFotoPagarFormGroup(sampleWithRequiredData);

        const fotoPagar = service.getFotoPagar(formGroup) as any;

        expect(fotoPagar).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFotoPagar should not enable id FormControl', () => {
        const formGroup = service.createFotoPagarFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFotoPagar should disable id FormControl', () => {
        const formGroup = service.createFotoPagarFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
