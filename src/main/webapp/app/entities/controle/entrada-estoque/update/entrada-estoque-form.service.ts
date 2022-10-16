import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEntradaEstoque, NewEntradaEstoque } from '../entrada-estoque.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEntradaEstoque for edit and NewEntradaEstoqueFormGroupInput for create.
 */
type EntradaEstoqueFormGroupInput = IEntradaEstoque | PartialWithRequiredKeyOf<NewEntradaEstoque>;

type EntradaEstoqueFormDefaults = Pick<NewEntradaEstoque, 'id'>;

type EntradaEstoqueFormGroupContent = {
  id: FormControl<IEntradaEstoque['id'] | NewEntradaEstoque['id']>;
  data: FormControl<IEntradaEstoque['data']>;
  qtde: FormControl<IEntradaEstoque['qtde']>;
  valorUnitario: FormControl<IEntradaEstoque['valorUnitario']>;
  obs: FormControl<IEntradaEstoque['obs']>;
  produto: FormControl<IEntradaEstoque['produto']>;
  dadosPessoais: FormControl<IEntradaEstoque['dadosPessoais']>;
};

export type EntradaEstoqueFormGroup = FormGroup<EntradaEstoqueFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EntradaEstoqueFormService {
  createEntradaEstoqueFormGroup(entradaEstoque: EntradaEstoqueFormGroupInput = { id: null }): EntradaEstoqueFormGroup {
    const entradaEstoqueRawValue = {
      ...this.getFormDefaults(),
      ...entradaEstoque,
    };
    return new FormGroup<EntradaEstoqueFormGroupContent>({
      id: new FormControl(
        { value: entradaEstoqueRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      data: new FormControl(entradaEstoqueRawValue.data, {
        validators: [Validators.required],
      }),
      qtde: new FormControl(entradaEstoqueRawValue.qtde, {
        validators: [Validators.required],
      }),
      valorUnitario: new FormControl(entradaEstoqueRawValue.valorUnitario, {
        validators: [Validators.required],
      }),
      obs: new FormControl(entradaEstoqueRawValue.obs, {
        validators: [Validators.maxLength(50)],
      }),
      produto: new FormControl(entradaEstoqueRawValue.produto),
      dadosPessoais: new FormControl(entradaEstoqueRawValue.dadosPessoais),
    });
  }

  getEntradaEstoque(form: EntradaEstoqueFormGroup): IEntradaEstoque | NewEntradaEstoque {
    return form.getRawValue() as IEntradaEstoque | NewEntradaEstoque;
  }

  resetForm(form: EntradaEstoqueFormGroup, entradaEstoque: EntradaEstoqueFormGroupInput): void {
    const entradaEstoqueRawValue = { ...this.getFormDefaults(), ...entradaEstoque };
    form.reset(
      {
        ...entradaEstoqueRawValue,
        id: { value: entradaEstoqueRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EntradaEstoqueFormDefaults {
    return {
      id: null,
    };
  }
}
