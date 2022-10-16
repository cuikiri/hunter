import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITipoTransacao, NewTipoTransacao } from '../tipo-transacao.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoTransacao for edit and NewTipoTransacaoFormGroupInput for create.
 */
type TipoTransacaoFormGroupInput = ITipoTransacao | PartialWithRequiredKeyOf<NewTipoTransacao>;

type TipoTransacaoFormDefaults = Pick<NewTipoTransacao, 'id'>;

type TipoTransacaoFormGroupContent = {
  id: FormControl<ITipoTransacao['id'] | NewTipoTransacao['id']>;
  nome: FormControl<ITipoTransacao['nome']>;
};

export type TipoTransacaoFormGroup = FormGroup<TipoTransacaoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TipoTransacaoFormService {
  createTipoTransacaoFormGroup(tipoTransacao: TipoTransacaoFormGroupInput = { id: null }): TipoTransacaoFormGroup {
    const tipoTransacaoRawValue = {
      ...this.getFormDefaults(),
      ...tipoTransacao,
    };
    return new FormGroup<TipoTransacaoFormGroupContent>({
      id: new FormControl(
        { value: tipoTransacaoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(tipoTransacaoRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(20)],
      }),
    });
  }

  getTipoTransacao(form: TipoTransacaoFormGroup): ITipoTransacao | NewTipoTransacao {
    return form.getRawValue() as ITipoTransacao | NewTipoTransacao;
  }

  resetForm(form: TipoTransacaoFormGroup, tipoTransacao: TipoTransacaoFormGroupInput): void {
    const tipoTransacaoRawValue = { ...this.getFormDefaults(), ...tipoTransacao };
    form.reset(
      {
        ...tipoTransacaoRawValue,
        id: { value: tipoTransacaoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TipoTransacaoFormDefaults {
    return {
      id: null,
    };
  }
}
