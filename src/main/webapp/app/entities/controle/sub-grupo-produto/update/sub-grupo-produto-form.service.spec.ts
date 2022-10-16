import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../sub-grupo-produto.test-samples';

import { SubGrupoProdutoFormService } from './sub-grupo-produto-form.service';

describe('SubGrupoProduto Form Service', () => {
  let service: SubGrupoProdutoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubGrupoProdutoFormService);
  });

  describe('Service methods', () => {
    describe('createSubGrupoProdutoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSubGrupoProdutoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            obs: expect.any(Object),
            grupoProduto: expect.any(Object),
          })
        );
      });

      it('passing ISubGrupoProduto should create a new form with FormGroup', () => {
        const formGroup = service.createSubGrupoProdutoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            obs: expect.any(Object),
            grupoProduto: expect.any(Object),
          })
        );
      });
    });

    describe('getSubGrupoProduto', () => {
      it('should return NewSubGrupoProduto for default SubGrupoProduto initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSubGrupoProdutoFormGroup(sampleWithNewData);

        const subGrupoProduto = service.getSubGrupoProduto(formGroup) as any;

        expect(subGrupoProduto).toMatchObject(sampleWithNewData);
      });

      it('should return NewSubGrupoProduto for empty SubGrupoProduto initial value', () => {
        const formGroup = service.createSubGrupoProdutoFormGroup();

        const subGrupoProduto = service.getSubGrupoProduto(formGroup) as any;

        expect(subGrupoProduto).toMatchObject({});
      });

      it('should return ISubGrupoProduto', () => {
        const formGroup = service.createSubGrupoProdutoFormGroup(sampleWithRequiredData);

        const subGrupoProduto = service.getSubGrupoProduto(formGroup) as any;

        expect(subGrupoProduto).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISubGrupoProduto should not enable id FormControl', () => {
        const formGroup = service.createSubGrupoProdutoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSubGrupoProduto should disable id FormControl', () => {
        const formGroup = service.createSubGrupoProdutoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
