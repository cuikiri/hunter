import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAlergia, NewAlergia } from '../alergia.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAlergia for edit and NewAlergiaFormGroupInput for create.
 */
type AlergiaFormGroupInput = IAlergia | PartialWithRequiredKeyOf<NewAlergia>;

type AlergiaFormDefaults = Pick<NewAlergia, 'id'>;

type AlergiaFormGroupContent = {
  id: FormControl<IAlergia['id'] | NewAlergia['id']>;
  nome: FormControl<IAlergia['nome']>;
  sintoma: FormControl<IAlergia['sintoma']>;
  precaucoes: FormControl<IAlergia['precaucoes']>;
  socorro: FormControl<IAlergia['socorro']>;
  obs: FormControl<IAlergia['obs']>;
};

export type AlergiaFormGroup = FormGroup<AlergiaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AlergiaFormService {
  createAlergiaFormGroup(alergia: AlergiaFormGroupInput = { id: null }): AlergiaFormGroup {
    const alergiaRawValue = {
      ...this.getFormDefaults(),
      ...alergia,
    };
    return new FormGroup<AlergiaFormGroupContent>({
      id: new FormControl(
        { value: alergiaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(alergiaRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      sintoma: new FormControl(alergiaRawValue.sintoma, {
        validators: [Validators.maxLength(150)],
      }),
      precaucoes: new FormControl(alergiaRawValue.precaucoes, {
        validators: [Validators.maxLength(150)],
      }),
      socorro: new FormControl(alergiaRawValue.socorro, {
        validators: [Validators.maxLength(150)],
      }),
      obs: new FormControl(alergiaRawValue.obs, {
        validators: [Validators.maxLength(50)],
      }),
    });
  }

  getAlergia(form: AlergiaFormGroup): IAlergia | NewAlergia {
    return form.getRawValue() as IAlergia | NewAlergia;
  }

  resetForm(form: AlergiaFormGroup, alergia: AlergiaFormGroupInput): void {
    const alergiaRawValue = { ...this.getFormDefaults(), ...alergia };
    form.reset(
      {
        ...alergiaRawValue,
        id: { value: alergiaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AlergiaFormDefaults {
    return {
      id: null,
    };
  }
}
