import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../foto-entrada-estoque.test-samples';

import { FotoEntradaEstoqueFormService } from './foto-entrada-estoque-form.service';

describe('FotoEntradaEstoque Form Service', () => {
  let service: FotoEntradaEstoqueFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoEntradaEstoqueFormService);
  });

  describe('Service methods', () => {
    describe('createFotoEntradaEstoqueFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFotoEntradaEstoqueFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
            entradaEstoque: expect.any(Object),
          })
        );
      });

      it('passing IFotoEntradaEstoque should create a new form with FormGroup', () => {
        const formGroup = service.createFotoEntradaEstoqueFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
            entradaEstoque: expect.any(Object),
          })
        );
      });
    });

    describe('getFotoEntradaEstoque', () => {
      it('should return NewFotoEntradaEstoque for default FotoEntradaEstoque initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFotoEntradaEstoqueFormGroup(sampleWithNewData);

        const fotoEntradaEstoque = service.getFotoEntradaEstoque(formGroup) as any;

        expect(fotoEntradaEstoque).toMatchObject(sampleWithNewData);
      });

      it('should return NewFotoEntradaEstoque for empty FotoEntradaEstoque initial value', () => {
        const formGroup = service.createFotoEntradaEstoqueFormGroup();

        const fotoEntradaEstoque = service.getFotoEntradaEstoque(formGroup) as any;

        expect(fotoEntradaEstoque).toMatchObject({});
      });

      it('should return IFotoEntradaEstoque', () => {
        const formGroup = service.createFotoEntradaEstoqueFormGroup(sampleWithRequiredData);

        const fotoEntradaEstoque = service.getFotoEntradaEstoque(formGroup) as any;

        expect(fotoEntradaEstoque).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFotoEntradaEstoque should not enable id FormControl', () => {
        const formGroup = service.createFotoEntradaEstoqueFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFotoEntradaEstoque should disable id FormControl', () => {
        const formGroup = service.createFotoEntradaEstoqueFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
