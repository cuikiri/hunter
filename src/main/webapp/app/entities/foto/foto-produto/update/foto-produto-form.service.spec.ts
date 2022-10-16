import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../foto-produto.test-samples';

import { FotoProdutoFormService } from './foto-produto-form.service';

describe('FotoProduto Form Service', () => {
  let service: FotoProdutoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoProdutoFormService);
  });

  describe('Service methods', () => {
    describe('createFotoProdutoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFotoProdutoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
            produto: expect.any(Object),
          })
        );
      });

      it('passing IFotoProduto should create a new form with FormGroup', () => {
        const formGroup = service.createFotoProdutoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
            produto: expect.any(Object),
          })
        );
      });
    });

    describe('getFotoProduto', () => {
      it('should return NewFotoProduto for default FotoProduto initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFotoProdutoFormGroup(sampleWithNewData);

        const fotoProduto = service.getFotoProduto(formGroup) as any;

        expect(fotoProduto).toMatchObject(sampleWithNewData);
      });

      it('should return NewFotoProduto for empty FotoProduto initial value', () => {
        const formGroup = service.createFotoProdutoFormGroup();

        const fotoProduto = service.getFotoProduto(formGroup) as any;

        expect(fotoProduto).toMatchObject({});
      });

      it('should return IFotoProduto', () => {
        const formGroup = service.createFotoProdutoFormGroup(sampleWithRequiredData);

        const fotoProduto = service.getFotoProduto(formGroup) as any;

        expect(fotoProduto).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFotoProduto should not enable id FormControl', () => {
        const formGroup = service.createFotoProdutoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFotoProduto should disable id FormControl', () => {
        const formGroup = service.createFotoProdutoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
