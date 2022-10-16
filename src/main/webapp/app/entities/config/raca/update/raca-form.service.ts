import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IRaca, NewRaca } from '../raca.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRaca for edit and NewRacaFormGroupInput for create.
 */
type RacaFormGroupInput = IRaca | PartialWithRequiredKeyOf<NewRaca>;

type RacaFormDefaults = Pick<NewRaca, 'id'>;

type RacaFormGroupContent = {
  id: FormControl<IRaca['id'] | NewRaca['id']>;
  codigo: FormControl<IRaca['codigo']>;
  descricao: FormControl<IRaca['descricao']>;
};

export type RacaFormGroup = FormGroup<RacaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RacaFormService {
  createRacaFormGroup(raca: RacaFormGroupInput = { id: null }): RacaFormGroup {
    const racaRawValue = {
      ...this.getFormDefaults(),
      ...raca,
    };
    return new FormGroup<RacaFormGroupContent>({
      id: new FormControl(
        { value: racaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(racaRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(20)],
      }),
      descricao: new FormControl(racaRawValue.descricao, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
      }),
    });
  }

  getRaca(form: RacaFormGroup): IRaca | NewRaca {
    return form.getRawValue() as IRaca | NewRaca;
  }

  resetForm(form: RacaFormGroup, raca: RacaFormGroupInput): void {
    const racaRawValue = { ...this.getFormDefaults(), ...raca };
    form.reset(
      {
        ...racaRawValue,
        id: { value: racaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): RacaFormDefaults {
    return {
      id: null,
    };
  }
}
