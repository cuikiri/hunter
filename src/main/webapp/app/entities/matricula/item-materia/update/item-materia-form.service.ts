import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IItemMateria, NewItemMateria } from '../item-materia.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IItemMateria for edit and NewItemMateriaFormGroupInput for create.
 */
type ItemMateriaFormGroupInput = IItemMateria | PartialWithRequiredKeyOf<NewItemMateria>;

type ItemMateriaFormDefaults = Pick<NewItemMateria, 'id'>;

type ItemMateriaFormGroupContent = {
  id: FormControl<IItemMateria['id'] | NewItemMateria['id']>;
  nota: FormControl<IItemMateria['nota']>;
  obs: FormControl<IItemMateria['obs']>;
  materia: FormControl<IItemMateria['materia']>;
  acompanhamentoAluno: FormControl<IItemMateria['acompanhamentoAluno']>;
};

export type ItemMateriaFormGroup = FormGroup<ItemMateriaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ItemMateriaFormService {
  createItemMateriaFormGroup(itemMateria: ItemMateriaFormGroupInput = { id: null }): ItemMateriaFormGroup {
    const itemMateriaRawValue = {
      ...this.getFormDefaults(),
      ...itemMateria,
    };
    return new FormGroup<ItemMateriaFormGroupContent>({
      id: new FormControl(
        { value: itemMateriaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nota: new FormControl(itemMateriaRawValue.nota, {
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      obs: new FormControl(itemMateriaRawValue.obs, {
        validators: [Validators.maxLength(50)],
      }),
      materia: new FormControl(itemMateriaRawValue.materia),
      acompanhamentoAluno: new FormControl(itemMateriaRawValue.acompanhamentoAluno),
    });
  }

  getItemMateria(form: ItemMateriaFormGroup): IItemMateria | NewItemMateria {
    return form.getRawValue() as IItemMateria | NewItemMateria;
  }

  resetForm(form: ItemMateriaFormGroup, itemMateria: ItemMateriaFormGroupInput): void {
    const itemMateriaRawValue = { ...this.getFormDefaults(), ...itemMateria };
    form.reset(
      {
        ...itemMateriaRawValue,
        id: { value: itemMateriaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ItemMateriaFormDefaults {
    return {
      id: null,
    };
  }
}
