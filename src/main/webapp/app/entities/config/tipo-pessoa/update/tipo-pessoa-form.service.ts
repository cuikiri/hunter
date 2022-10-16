import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITipoPessoa, NewTipoPessoa } from '../tipo-pessoa.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoPessoa for edit and NewTipoPessoaFormGroupInput for create.
 */
type TipoPessoaFormGroupInput = ITipoPessoa | PartialWithRequiredKeyOf<NewTipoPessoa>;

type TipoPessoaFormDefaults = Pick<NewTipoPessoa, 'id'>;

type TipoPessoaFormGroupContent = {
  id: FormControl<ITipoPessoa['id'] | NewTipoPessoa['id']>;
  codigo: FormControl<ITipoPessoa['codigo']>;
  nome: FormControl<ITipoPessoa['nome']>;
  descricao: FormControl<ITipoPessoa['descricao']>;
};

export type TipoPessoaFormGroup = FormGroup<TipoPessoaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TipoPessoaFormService {
  createTipoPessoaFormGroup(tipoPessoa: TipoPessoaFormGroupInput = { id: null }): TipoPessoaFormGroup {
    const tipoPessoaRawValue = {
      ...this.getFormDefaults(),
      ...tipoPessoa,
    };
    return new FormGroup<TipoPessoaFormGroupContent>({
      id: new FormControl(
        { value: tipoPessoaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(tipoPessoaRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(20)],
      }),
      nome: new FormControl(tipoPessoaRawValue.nome, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
      }),
      descricao: new FormControl(tipoPessoaRawValue.descricao, {
        validators: [Validators.minLength(1), Validators.maxLength(100)],
      }),
    });
  }

  getTipoPessoa(form: TipoPessoaFormGroup): ITipoPessoa | NewTipoPessoa {
    return form.getRawValue() as ITipoPessoa | NewTipoPessoa;
  }

  resetForm(form: TipoPessoaFormGroup, tipoPessoa: TipoPessoaFormGroupInput): void {
    const tipoPessoaRawValue = { ...this.getFormDefaults(), ...tipoPessoa };
    form.reset(
      {
        ...tipoPessoaRawValue,
        id: { value: tipoPessoaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TipoPessoaFormDefaults {
    return {
      id: null,
    };
  }
}
