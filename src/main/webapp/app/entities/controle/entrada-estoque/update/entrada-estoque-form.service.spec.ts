import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../entrada-estoque.test-samples';

import { EntradaEstoqueFormService } from './entrada-estoque-form.service';

describe('EntradaEstoque Form Service', () => {
  let service: EntradaEstoqueFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntradaEstoqueFormService);
  });

  describe('Service methods', () => {
    describe('createEntradaEstoqueFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEntradaEstoqueFormGroup();

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

      it('passing IEntradaEstoque should create a new form with FormGroup', () => {
        const formGroup = service.createEntradaEstoqueFormGroup(sampleWithRequiredData);

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

    describe('getEntradaEstoque', () => {
      it('should return NewEntradaEstoque for default EntradaEstoque initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEntradaEstoqueFormGroup(sampleWithNewData);

        const entradaEstoque = service.getEntradaEstoque(formGroup) as any;

        expect(entradaEstoque).toMatchObject(sampleWithNewData);
      });

      it('should return NewEntradaEstoque for empty EntradaEstoque initial value', () => {
        const formGroup = service.createEntradaEstoqueFormGroup();

        const entradaEstoque = service.getEntradaEstoque(formGroup) as any;

        expect(entradaEstoque).toMatchObject({});
      });

      it('should return IEntradaEstoque', () => {
        const formGroup = service.createEntradaEstoqueFormGroup(sampleWithRequiredData);

        const entradaEstoque = service.getEntradaEstoque(formGroup) as any;

        expect(entradaEstoque).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEntradaEstoque should not enable id FormControl', () => {
        const formGroup = service.createEntradaEstoqueFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEntradaEstoque should disable id FormControl', () => {
        const formGroup = service.createEntradaEstoqueFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
