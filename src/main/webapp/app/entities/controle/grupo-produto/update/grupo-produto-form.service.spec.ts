import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../grupo-produto.test-samples';

import { GrupoProdutoFormService } from './grupo-produto-form.service';

describe('GrupoProduto Form Service', () => {
  let service: GrupoProdutoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoProdutoFormService);
  });

  describe('Service methods', () => {
    describe('createGrupoProdutoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGrupoProdutoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            obs: expect.any(Object),
          })
        );
      });

      it('passing IGrupoProduto should create a new form with FormGroup', () => {
        const formGroup = service.createGrupoProdutoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            obs: expect.any(Object),
          })
        );
      });
    });

    describe('getGrupoProduto', () => {
      it('should return NewGrupoProduto for default GrupoProduto initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createGrupoProdutoFormGroup(sampleWithNewData);

        const grupoProduto = service.getGrupoProduto(formGroup) as any;

        expect(grupoProduto).toMatchObject(sampleWithNewData);
      });

      it('should return NewGrupoProduto for empty GrupoProduto initial value', () => {
        const formGroup = service.createGrupoProdutoFormGroup();

        const grupoProduto = service.getGrupoProduto(formGroup) as any;

        expect(grupoProduto).toMatchObject({});
      });

      it('should return IGrupoProduto', () => {
        const formGroup = service.createGrupoProdutoFormGroup(sampleWithRequiredData);

        const grupoProduto = service.getGrupoProduto(formGroup) as any;

        expect(grupoProduto).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGrupoProduto should not enable id FormControl', () => {
        const formGroup = service.createGrupoProdutoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGrupoProduto should disable id FormControl', () => {
        const formGroup = service.createGrupoProdutoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
