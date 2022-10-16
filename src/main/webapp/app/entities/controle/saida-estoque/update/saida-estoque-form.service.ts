import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISaidaEstoque, NewSaidaEstoque } from '../saida-estoque.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISaidaEstoque for edit and NewSaidaEstoqueFormGroupInput for create.
 */
type SaidaEstoqueFormGroupInput = ISaidaEstoque | PartialWithRequiredKeyOf<NewSaidaEstoque>;

type SaidaEstoqueFormDefaults = Pick<NewSaidaEstoque, 'id'>;

type SaidaEstoqueFormGroupContent = {
  id: FormControl<ISaidaEstoque['id'] | NewSaidaEstoque['id']>;
  data: FormControl<ISaidaEstoque['data']>;
  qtde: FormControl<ISaidaEstoque['qtde']>;
  valorUnitario: FormControl<ISaidaEstoque['valorUnitario']>;
  obs: FormControl<ISaidaEstoque['obs']>;
  produto: FormControl<ISaidaEstoque['produto']>;
  dadosPessoais: FormControl<ISaidaEstoque['dadosPessoais']>;
};

export type SaidaEstoqueFormGroup = FormGroup<SaidaEstoqueFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SaidaEstoqueFormService {
  createSaidaEstoqueFormGroup(saidaEstoque: SaidaEstoqueFormGroupInput = { id: null }): SaidaEstoqueFormGroup {
    const saidaEstoqueRawValue = {
      ...this.getFormDefaults(),
      ...saidaEstoque,
    };
    return new FormGroup<SaidaEstoqueFormGroupContent>({
      id: new FormControl(
        { value: saidaEstoqueRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      data: new FormControl(saidaEstoqueRawValue.data, {
        validators: [Validators.required],
      }),
      qtde: new FormControl(saidaEstoqueRawValue.qtde, {
        validators: [Validators.required],
      }),
      valorUnitario: new FormControl(saidaEstoqueRawValue.valorUnitario, {
        validators: [Validators.required],
      }),
      obs: new FormControl(saidaEstoqueRawValue.obs, {
        validators: [Validators.maxLength(100)],
      }),
      produto: new FormControl(saidaEstoqueRawValue.produto),
      dadosPessoais: new FormControl(saidaEstoqueRawValue.dadosPessoais),
    });
  }

  getSaidaEstoque(form: SaidaEstoqueFormGroup): ISaidaEstoque | NewSaidaEstoque {
    return form.getRawValue() as ISaidaEstoque | NewSaidaEstoque;
  }

  resetForm(form: SaidaEstoqueFormGroup, saidaEstoque: SaidaEstoqueFormGroupInput): void {
    const saidaEstoqueRawValue = { ...this.getFormDefaults(), ...saidaEstoque };
    form.reset(
      {
        ...saidaEstoqueRawValue,
        id: { value: saidaEstoqueRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SaidaEstoqueFormDefaults {
    return {
      id: null,
    };
  }
}
