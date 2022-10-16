import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITipoPagar, NewTipoPagar } from '../tipo-pagar.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoPagar for edit and NewTipoPagarFormGroupInput for create.
 */
type TipoPagarFormGroupInput = ITipoPagar | PartialWithRequiredKeyOf<NewTipoPagar>;

type TipoPagarFormDefaults = Pick<NewTipoPagar, 'id'>;

type TipoPagarFormGroupContent = {
  id: FormControl<ITipoPagar['id'] | NewTipoPagar['id']>;
  nome: FormControl<ITipoPagar['nome']>;
};

export type TipoPagarFormGroup = FormGroup<TipoPagarFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TipoPagarFormService {
  createTipoPagarFormGroup(tipoPagar: TipoPagarFormGroupInput = { id: null }): TipoPagarFormGroup {
    const tipoPagarRawValue = {
      ...this.getFormDefaults(),
      ...tipoPagar,
    };
    return new FormGroup<TipoPagarFormGroupContent>({
      id: new FormControl(
        { value: tipoPagarRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(tipoPagarRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(20)],
      }),
    });
  }

  getTipoPagar(form: TipoPagarFormGroup): ITipoPagar | NewTipoPagar {
    return form.getRawValue() as ITipoPagar | NewTipoPagar;
  }

  resetForm(form: TipoPagarFormGroup, tipoPagar: TipoPagarFormGroupInput): void {
    const tipoPagarRawValue = { ...this.getFormDefaults(), ...tipoPagar };
    form.reset(
      {
        ...tipoPagarRawValue,
        id: { value: tipoPagarRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TipoPagarFormDefaults {
    return {
      id: null,
    };
  }
}
