import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGrupoProduto, NewGrupoProduto } from '../grupo-produto.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGrupoProduto for edit and NewGrupoProdutoFormGroupInput for create.
 */
type GrupoProdutoFormGroupInput = IGrupoProduto | PartialWithRequiredKeyOf<NewGrupoProduto>;

type GrupoProdutoFormDefaults = Pick<NewGrupoProduto, 'id'>;

type GrupoProdutoFormGroupContent = {
  id: FormControl<IGrupoProduto['id'] | NewGrupoProduto['id']>;
  nome: FormControl<IGrupoProduto['nome']>;
  obs: FormControl<IGrupoProduto['obs']>;
};

export type GrupoProdutoFormGroup = FormGroup<GrupoProdutoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GrupoProdutoFormService {
  createGrupoProdutoFormGroup(grupoProduto: GrupoProdutoFormGroupInput = { id: null }): GrupoProdutoFormGroup {
    const grupoProdutoRawValue = {
      ...this.getFormDefaults(),
      ...grupoProduto,
    };
    return new FormGroup<GrupoProdutoFormGroupContent>({
      id: new FormControl(
        { value: grupoProdutoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(grupoProdutoRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(30)],
      }),
      obs: new FormControl(grupoProdutoRawValue.obs, {
        validators: [Validators.maxLength(50)],
      }),
    });
  }

  getGrupoProduto(form: GrupoProdutoFormGroup): IGrupoProduto | NewGrupoProduto {
    return form.getRawValue() as IGrupoProduto | NewGrupoProduto;
  }

  resetForm(form: GrupoProdutoFormGroup, grupoProduto: GrupoProdutoFormGroupInput): void {
    const grupoProdutoRawValue = { ...this.getFormDefaults(), ...grupoProduto };
    form.reset(
      {
        ...grupoProdutoRawValue,
        id: { value: grupoProdutoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): GrupoProdutoFormDefaults {
    return {
      id: null,
    };
  }
}
