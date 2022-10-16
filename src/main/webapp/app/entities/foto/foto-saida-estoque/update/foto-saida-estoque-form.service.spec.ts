import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../foto-saida-estoque.test-samples';

import { FotoSaidaEstoqueFormService } from './foto-saida-estoque-form.service';

describe('FotoSaidaEstoque Form Service', () => {
  let service: FotoSaidaEstoqueFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoSaidaEstoqueFormService);
  });

  describe('Service methods', () => {
    describe('createFotoSaidaEstoqueFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFotoSaidaEstoqueFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
            saidaEstoque: expect.any(Object),
          })
        );
      });

      it('passing IFotoSaidaEstoque should create a new form with FormGroup', () => {
        const formGroup = service.createFotoSaidaEstoqueFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
            saidaEstoque: expect.any(Object),
          })
        );
      });
    });

    describe('getFotoSaidaEstoque', () => {
      it('should return NewFotoSaidaEstoque for default FotoSaidaEstoque initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFotoSaidaEstoqueFormGroup(sampleWithNewData);

        const fotoSaidaEstoque = service.getFotoSaidaEstoque(formGroup) as any;

        expect(fotoSaidaEstoque).toMatchObject(sampleWithNewData);
      });

      it('should return NewFotoSaidaEstoque for empty FotoSaidaEstoque initial value', () => {
        const formGroup = service.createFotoSaidaEstoqueFormGroup();

        const fotoSaidaEstoque = service.getFotoSaidaEstoque(formGroup) as any;

        expect(fotoSaidaEstoque).toMatchObject({});
      });

      it('should return IFotoSaidaEstoque', () => {
        const formGroup = service.createFotoSaidaEstoqueFormGroup(sampleWithRequiredData);

        const fotoSaidaEstoque = service.getFotoSaidaEstoque(formGroup) as any;

        expect(fotoSaidaEstoque).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFotoSaidaEstoque should not enable id FormControl', () => {
        const formGroup = service.createFotoSaidaEstoqueFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFotoSaidaEstoque should disable id FormControl', () => {
        const formGroup = service.createFotoSaidaEstoqueFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
