import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../pagar.test-samples';

import { PagarFormService } from './pagar-form.service';

describe('Pagar Form Service', () => {
  let service: PagarFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagarFormService);
  });

  describe('Service methods', () => {
    describe('createPagarFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPagarFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            data: expect.any(Object),
            valor: expect.any(Object),
            status: expect.any(Object),
            obs: expect.any(Object),
            tipoPagar: expect.any(Object),
            pagarPara: expect.any(Object),
            tipoTransacao: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });

      it('passing IPagar should create a new form with FormGroup', () => {
        const formGroup = service.createPagarFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            data: expect.any(Object),
            valor: expect.any(Object),
            status: expect.any(Object),
            obs: expect.any(Object),
            tipoPagar: expect.any(Object),
            pagarPara: expect.any(Object),
            tipoTransacao: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });
    });

    describe('getPagar', () => {
      it('should return NewPagar for default Pagar initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPagarFormGroup(sampleWithNewData);

        const pagar = service.getPagar(formGroup) as any;

        expect(pagar).toMatchObject(sampleWithNewData);
      });

      it('should return NewPagar for empty Pagar initial value', () => {
        const formGroup = service.createPagarFormGroup();

        const pagar = service.getPagar(formGroup) as any;

        expect(pagar).toMatchObject({});
      });

      it('should return IPagar', () => {
        const formGroup = service.createPagarFormGroup(sampleWithRequiredData);

        const pagar = service.getPagar(formGroup) as any;

        expect(pagar).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPagar should not enable id FormControl', () => {
        const formGroup = service.createPagarFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPagar should disable id FormControl', () => {
        const formGroup = service.createPagarFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
