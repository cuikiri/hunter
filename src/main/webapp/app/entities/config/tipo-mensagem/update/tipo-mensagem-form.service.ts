import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITipoMensagem, NewTipoMensagem } from '../tipo-mensagem.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoMensagem for edit and NewTipoMensagemFormGroupInput for create.
 */
type TipoMensagemFormGroupInput = ITipoMensagem | PartialWithRequiredKeyOf<NewTipoMensagem>;

type TipoMensagemFormDefaults = Pick<NewTipoMensagem, 'id'>;

type TipoMensagemFormGroupContent = {
  id: FormControl<ITipoMensagem['id'] | NewTipoMensagem['id']>;
  codigo: FormControl<ITipoMensagem['codigo']>;
  nome: FormControl<ITipoMensagem['nome']>;
  descricao: FormControl<ITipoMensagem['descricao']>;
};

export type TipoMensagemFormGroup = FormGroup<TipoMensagemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TipoMensagemFormService {
  createTipoMensagemFormGroup(tipoMensagem: TipoMensagemFormGroupInput = { id: null }): TipoMensagemFormGroup {
    const tipoMensagemRawValue = {
      ...this.getFormDefaults(),
      ...tipoMensagem,
    };
    return new FormGroup<TipoMensagemFormGroupContent>({
      id: new FormControl(
        { value: tipoMensagemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(tipoMensagemRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(20)],
      }),
      nome: new FormControl(tipoMensagemRawValue.nome, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
      }),
      descricao: new FormControl(tipoMensagemRawValue.descricao, {
        validators: [Validators.minLength(1), Validators.maxLength(100)],
      }),
    });
  }

  getTipoMensagem(form: TipoMensagemFormGroup): ITipoMensagem | NewTipoMensagem {
    return form.getRawValue() as ITipoMensagem | NewTipoMensagem;
  }

  resetForm(form: TipoMensagemFormGroup, tipoMensagem: TipoMensagemFormGroupInput): void {
    const tipoMensagemRawValue = { ...this.getFormDefaults(), ...tipoMensagem };
    form.reset(
      {
        ...tipoMensagemRawValue,
        id: { value: tipoMensagemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TipoMensagemFormDefaults {
    return {
      id: null,
    };
  }
}
