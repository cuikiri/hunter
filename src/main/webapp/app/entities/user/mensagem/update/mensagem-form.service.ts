import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMensagem, NewMensagem } from '../mensagem.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMensagem for edit and NewMensagemFormGroupInput for create.
 */
type MensagemFormGroupInput = IMensagem | PartialWithRequiredKeyOf<NewMensagem>;

type MensagemFormDefaults = Pick<NewMensagem, 'id'>;

type MensagemFormGroupContent = {
  id: FormControl<IMensagem['id'] | NewMensagem['id']>;
  data: FormControl<IMensagem['data']>;
  titulo: FormControl<IMensagem['titulo']>;
  conteudo: FormControl<IMensagem['conteudo']>;
  tipo: FormControl<IMensagem['tipo']>;
  dadosPessoais: FormControl<IMensagem['dadosPessoais']>;
};

export type MensagemFormGroup = FormGroup<MensagemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MensagemFormService {
  createMensagemFormGroup(mensagem: MensagemFormGroupInput = { id: null }): MensagemFormGroup {
    const mensagemRawValue = {
      ...this.getFormDefaults(),
      ...mensagem,
    };
    return new FormGroup<MensagemFormGroupContent>({
      id: new FormControl(
        { value: mensagemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      data: new FormControl(mensagemRawValue.data, {
        validators: [Validators.required],
      }),
      titulo: new FormControl(mensagemRawValue.titulo, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(40)],
      }),
      conteudo: new FormControl(mensagemRawValue.conteudo, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(1000)],
      }),
      tipo: new FormControl(mensagemRawValue.tipo, {
        validators: [Validators.required],
      }),
      dadosPessoais: new FormControl(mensagemRawValue.dadosPessoais),
    });
  }

  getMensagem(form: MensagemFormGroup): IMensagem | NewMensagem {
    return form.getRawValue() as IMensagem | NewMensagem;
  }

  resetForm(form: MensagemFormGroup, mensagem: MensagemFormGroupInput): void {
    const mensagemRawValue = { ...this.getFormDefaults(), ...mensagem };
    form.reset(
      {
        ...mensagemRawValue,
        id: { value: mensagemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MensagemFormDefaults {
    return {
      id: null,
    };
  }
}
