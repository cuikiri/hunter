import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../pagar-para.test-samples';

import { PagarParaFormService } from './pagar-para-form.service';

describe('PagarPara Form Service', () => {
  let service: PagarParaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagarParaFormService);
  });

  describe('Service methods', () => {
    describe('createPagarParaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPagarParaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            descricao: expect.any(Object),
            cnpj: expect.any(Object),
            documento: expect.any(Object),
            banco: expect.any(Object),
            agencia: expect.any(Object),
            conta: expect.any(Object),
            pix: expect.any(Object),
          })
        );
      });

      it('passing IPagarPara should create a new form with FormGroup', () => {
        const formGroup = service.createPagarParaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            descricao: expect.any(Object),
            cnpj: expect.any(Object),
            documento: expect.any(Object),
            banco: expect.any(Object),
            agencia: expect.any(Object),
            conta: expect.any(Object),
            pix: expect.any(Object),
          })
        );
      });
    });

    describe('getPagarPara', () => {
      it('should return NewPagarPara for default PagarPara initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPagarParaFormGroup(sampleWithNewData);

        const pagarPara = service.getPagarPara(formGroup) as any;

        expect(pagarPara).toMatchObject(sampleWithNewData);
      });

      it('should return NewPagarPara for empty PagarPara initial value', () => {
        const formGroup = service.createPagarParaFormGroup();

        const pagarPara = service.getPagarPara(formGroup) as any;

        expect(pagarPara).toMatchObject({});
      });

      it('should return IPagarPara', () => {
        const formGroup = service.createPagarParaFormGroup(sampleWithRequiredData);

        const pagarPara = service.getPagarPara(formGroup) as any;

        expect(pagarPara).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPagarPara should not enable id FormControl', () => {
        const formGroup = service.createPagarParaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPagarPara should disable id FormControl', () => {
        const formGroup = service.createPagarParaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
