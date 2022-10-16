import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../receber-de.test-samples';

import { ReceberDeFormService } from './receber-de-form.service';

describe('ReceberDe Form Service', () => {
  let service: ReceberDeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceberDeFormService);
  });

  describe('Service methods', () => {
    describe('createReceberDeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createReceberDeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            descricao: expect.any(Object),
            cnpj: expect.any(Object),
            documento: expect.any(Object),
          })
        );
      });

      it('passing IReceberDe should create a new form with FormGroup', () => {
        const formGroup = service.createReceberDeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            descricao: expect.any(Object),
            cnpj: expect.any(Object),
            documento: expect.any(Object),
          })
        );
      });
    });

    describe('getReceberDe', () => {
      it('should return NewReceberDe for default ReceberDe initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createReceberDeFormGroup(sampleWithNewData);

        const receberDe = service.getReceberDe(formGroup) as any;

        expect(receberDe).toMatchObject(sampleWithNewData);
      });

      it('should return NewReceberDe for empty ReceberDe initial value', () => {
        const formGroup = service.createReceberDeFormGroup();

        const receberDe = service.getReceberDe(formGroup) as any;

        expect(receberDe).toMatchObject({});
      });

      it('should return IReceberDe', () => {
        const formGroup = service.createReceberDeFormGroup(sampleWithRequiredData);

        const receberDe = service.getReceberDe(formGroup) as any;

        expect(receberDe).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IReceberDe should not enable id FormControl', () => {
        const formGroup = service.createReceberDeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewReceberDe should disable id FormControl', () => {
        const formGroup = service.createReceberDeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
