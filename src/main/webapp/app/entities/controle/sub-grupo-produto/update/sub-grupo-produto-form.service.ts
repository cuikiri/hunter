import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISubGrupoProduto, NewSubGrupoProduto } from '../sub-grupo-produto.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISubGrupoProduto for edit and NewSubGrupoProdutoFormGroupInput for create.
 */
type SubGrupoProdutoFormGroupInput = ISubGrupoProduto | PartialWithRequiredKeyOf<NewSubGrupoProduto>;

type SubGrupoProdutoFormDefaults = Pick<NewSubGrupoProduto, 'id'>;

type SubGrupoProdutoFormGroupContent = {
  id: FormControl<ISubGrupoProduto['id'] | NewSubGrupoProduto['id']>;
  nome: FormControl<ISubGrupoProduto['nome']>;
  obs: FormControl<ISubGrupoProduto['obs']>;
  grupoProduto: FormControl<ISubGrupoProduto['grupoProduto']>;
};

export type SubGrupoProdutoFormGroup = FormGroup<SubGrupoProdutoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SubGrupoProdutoFormService {
  createSubGrupoProdutoFormGroup(subGrupoProduto: SubGrupoProdutoFormGroupInput = { id: null }): SubGrupoProdutoFormGroup {
    const subGrupoProdutoRawValue = {
      ...this.getFormDefaults(),
      ...subGrupoProduto,
    };
    return new FormGroup<SubGrupoProdutoFormGroupContent>({
      id: new FormControl(
        { value: subGrupoProdutoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(subGrupoProdutoRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(30)],
      }),
      obs: new FormControl(subGrupoProdutoRawValue.obs, {
        validators: [Validators.maxLength(50)],
      }),
      grupoProduto: new FormControl(subGrupoProdutoRawValue.grupoProduto),
    });
  }

  getSubGrupoProduto(form: SubGrupoProdutoFormGroup): ISubGrupoProduto | NewSubGrupoProduto {
    return form.getRawValue() as ISubGrupoProduto | NewSubGrupoProduto;
  }

  resetForm(form: SubGrupoProdutoFormGroup, subGrupoProduto: SubGrupoProdutoFormGroupInput): void {
    const subGrupoProdutoRawValue = { ...this.getFormDefaults(), ...subGrupoProduto };
    form.reset(
      {
        ...subGrupoProdutoRawValue,
        id: { value: subGrupoProdutoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SubGrupoProdutoFormDefaults {
    return {
      id: null,
    };
  }
}
