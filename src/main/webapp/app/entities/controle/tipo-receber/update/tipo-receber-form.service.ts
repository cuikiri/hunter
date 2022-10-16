import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITipoReceber, NewTipoReceber } from '../tipo-receber.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoReceber for edit and NewTipoReceberFormGroupInput for create.
 */
type TipoReceberFormGroupInput = ITipoReceber | PartialWithRequiredKeyOf<NewTipoReceber>;

type TipoReceberFormDefaults = Pick<NewTipoReceber, 'id'>;

type TipoReceberFormGroupContent = {
  id: FormControl<ITipoReceber['id'] | NewTipoReceber['id']>;
  nome: FormControl<ITipoReceber['nome']>;
};

export type TipoReceberFormGroup = FormGroup<TipoReceberFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TipoReceberFormService {
  createTipoReceberFormGroup(tipoReceber: TipoReceberFormGroupInput = { id: null }): TipoReceberFormGroup {
    const tipoReceberRawValue = {
      ...this.getFormDefaults(),
      ...tipoReceber,
    };
    return new FormGroup<TipoReceberFormGroupContent>({
      id: new FormControl(
        { value: tipoReceberRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(tipoReceberRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(20)],
      }),
    });
  }

  getTipoReceber(form: TipoReceberFormGroup): ITipoReceber | NewTipoReceber {
    return form.getRawValue() as ITipoReceber | NewTipoReceber;
  }

  resetForm(form: TipoReceberFormGroup, tipoReceber: TipoReceberFormGroupInput): void {
    const tipoReceberRawValue = { ...this.getFormDefaults(), ...tipoReceber };
    form.reset(
      {
        ...tipoReceberRawValue,
        id: { value: tipoReceberRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TipoReceberFormDefaults {
    return {
      id: null,
    };
  }
}
