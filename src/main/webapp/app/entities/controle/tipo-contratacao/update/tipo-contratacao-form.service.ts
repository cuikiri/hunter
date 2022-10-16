import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITipoContratacao, NewTipoContratacao } from '../tipo-contratacao.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoContratacao for edit and NewTipoContratacaoFormGroupInput for create.
 */
type TipoContratacaoFormGroupInput = ITipoContratacao | PartialWithRequiredKeyOf<NewTipoContratacao>;

type TipoContratacaoFormDefaults = Pick<NewTipoContratacao, 'id'>;

type TipoContratacaoFormGroupContent = {
  id: FormControl<ITipoContratacao['id'] | NewTipoContratacao['id']>;
  nome: FormControl<ITipoContratacao['nome']>;
  colaborador: FormControl<ITipoContratacao['colaborador']>;
};

export type TipoContratacaoFormGroup = FormGroup<TipoContratacaoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TipoContratacaoFormService {
  createTipoContratacaoFormGroup(tipoContratacao: TipoContratacaoFormGroupInput = { id: null }): TipoContratacaoFormGroup {
    const tipoContratacaoRawValue = {
      ...this.getFormDefaults(),
      ...tipoContratacao,
    };
    return new FormGroup<TipoContratacaoFormGroupContent>({
      id: new FormControl(
        { value: tipoContratacaoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(tipoContratacaoRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      colaborador: new FormControl(tipoContratacaoRawValue.colaborador),
    });
  }

  getTipoContratacao(form: TipoContratacaoFormGroup): ITipoContratacao | NewTipoContratacao {
    return form.getRawValue() as ITipoContratacao | NewTipoContratacao;
  }

  resetForm(form: TipoContratacaoFormGroup, tipoContratacao: TipoContratacaoFormGroupInput): void {
    const tipoContratacaoRawValue = { ...this.getFormDefaults(), ...tipoContratacao };
    form.reset(
      {
        ...tipoContratacaoRawValue,
        id: { value: tipoContratacaoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TipoContratacaoFormDefaults {
    return {
      id: null,
    };
  }
}
