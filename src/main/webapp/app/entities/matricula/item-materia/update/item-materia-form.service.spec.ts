import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../item-materia.test-samples';

import { ItemMateriaFormService } from './item-materia-form.service';

describe('ItemMateria Form Service', () => {
  let service: ItemMateriaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemMateriaFormService);
  });

  describe('Service methods', () => {
    describe('createItemMateriaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createItemMateriaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nota: expect.any(Object),
            obs: expect.any(Object),
            materia: expect.any(Object),
            acompanhamentoAluno: expect.any(Object),
          })
        );
      });

      it('passing IItemMateria should create a new form with FormGroup', () => {
        const formGroup = service.createItemMateriaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nota: expect.any(Object),
            obs: expect.any(Object),
            materia: expect.any(Object),
            acompanhamentoAluno: expect.any(Object),
          })
        );
      });
    });

    describe('getItemMateria', () => {
      it('should return NewItemMateria for default ItemMateria initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createItemMateriaFormGroup(sampleWithNewData);

        const itemMateria = service.getItemMateria(formGroup) as any;

        expect(itemMateria).toMatchObject(sampleWithNewData);
      });

      it('should return NewItemMateria for empty ItemMateria initial value', () => {
        const formGroup = service.createItemMateriaFormGroup();

        const itemMateria = service.getItemMateria(formGroup) as any;

        expect(itemMateria).toMatchObject({});
      });

      it('should return IItemMateria', () => {
        const formGroup = service.createItemMateriaFormGroup(sampleWithRequiredData);

        const itemMateria = service.getItemMateria(formGroup) as any;

        expect(itemMateria).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IItemMateria should not enable id FormControl', () => {
        const formGroup = service.createItemMateriaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewItemMateria should disable id FormControl', () => {
        const formGroup = service.createItemMateriaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
