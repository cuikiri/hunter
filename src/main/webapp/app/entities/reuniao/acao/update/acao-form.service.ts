import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAcao, NewAcao } from '../acao.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAcao for edit and NewAcaoFormGroupInput for create.
 */
type AcaoFormGroupInput = IAcao | PartialWithRequiredKeyOf<NewAcao>;

type AcaoFormDefaults = Pick<NewAcao, 'id'>;

type AcaoFormGroupContent = {
  id: FormControl<IAcao['id'] | NewAcao['id']>;
  nome: FormControl<IAcao['nome']>;
  obs: FormControl<IAcao['obs']>;
  reuniao: FormControl<IAcao['reuniao']>;
};

export type AcaoFormGroup = FormGroup<AcaoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AcaoFormService {
  createAcaoFormGroup(acao: AcaoFormGroupInput = { id: null }): AcaoFormGroup {
    const acaoRawValue = {
      ...this.getFormDefaults(),
      ...acao,
    };
    return new FormGroup<AcaoFormGroupContent>({
      id: new FormControl(
        { value: acaoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(acaoRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      obs: new FormControl(acaoRawValue.obs, {
        validators: [Validators.maxLength(100)],
      }),
      reuniao: new FormControl(acaoRawValue.reuniao),
    });
  }

  getAcao(form: AcaoFormGroup): IAcao | NewAcao {
    return form.getRawValue() as IAcao | NewAcao;
  }

  resetForm(form: AcaoFormGroup, acao: AcaoFormGroupInput): void {
    const acaoRawValue = { ...this.getFormDefaults(), ...acao };
    form.reset(
      {
        ...acaoRawValue,
        id: { value: acaoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AcaoFormDefaults {
    return {
      id: null,
    };
  }
}
