import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../saida-estoque.test-samples';

import { SaidaEstoqueFormService } from './saida-estoque-form.service';

describe('SaidaEstoque Form Service', () => {
  let service: SaidaEstoqueFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaidaEstoqueFormService);
  });

  describe('Service methods', () => {
    describe('createSaidaEstoqueFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSaidaEstoqueFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            data: expect.any(Object),
            qtde: expect.any(Object),
            valorUnitario: expect.any(Object),
            obs: expect.any(Object),
            produto: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });

      it('passing ISaidaEstoque should create a new form with FormGroup', () => {
        const formGroup = service.createSaidaEstoqueFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            data: expect.any(Object),
            qtde: expect.any(Object),
            valorUnitario: expect.any(Object),
            obs: expect.any(Object),
            produto: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });
    });

    describe('getSaidaEstoque', () => {
      it('should return NewSaidaEstoque for default SaidaEstoque initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSaidaEstoqueFormGroup(sampleWithNewData);

        const saidaEstoque = service.getSaidaEstoque(formGroup) as any;

        expect(saidaEstoque).toMatchObject(sampleWithNewData);
      });

      it('should return NewSaidaEstoque for empty SaidaEstoque initial value', () => {
        const formGroup = service.createSaidaEstoqueFormGroup();

        const saidaEstoque = service.getSaidaEstoque(formGroup) as any;

        expect(saidaEstoque).toMatchObject({});
      });

      it('should return ISaidaEstoque', () => {
        const formGroup = service.createSaidaEstoqueFormGroup(sampleWithRequiredData);

        const saidaEstoque = service.getSaidaEstoque(formGroup) as any;

        expect(saidaEstoque).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISaidaEstoque should not enable id FormControl', () => {
        const formGroup = service.createSaidaEstoqueFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSaidaEstoque should disable id FormControl', () => {
        const formGroup = service.createSaidaEstoqueFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
