import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDoenca, NewDoenca } from '../doenca.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDoenca for edit and NewDoencaFormGroupInput for create.
 */
type DoencaFormGroupInput = IDoenca | PartialWithRequiredKeyOf<NewDoenca>;

type DoencaFormDefaults = Pick<NewDoenca, 'id'>;

type DoencaFormGroupContent = {
  id: FormControl<IDoenca['id'] | NewDoenca['id']>;
  nome: FormControl<IDoenca['nome']>;
  sintoma: FormControl<IDoenca['sintoma']>;
  precaucoes: FormControl<IDoenca['precaucoes']>;
  socorro: FormControl<IDoenca['socorro']>;
  obs: FormControl<IDoenca['obs']>;
};

export type DoencaFormGroup = FormGroup<DoencaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DoencaFormService {
  createDoencaFormGroup(doenca: DoencaFormGroupInput = { id: null }): DoencaFormGroup {
    const doencaRawValue = {
      ...this.getFormDefaults(),
      ...doenca,
    };
    return new FormGroup<DoencaFormGroupContent>({
      id: new FormControl(
        { value: doencaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(doencaRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      sintoma: new FormControl(doencaRawValue.sintoma, {
        validators: [Validators.maxLength(150)],
      }),
      precaucoes: new FormControl(doencaRawValue.precaucoes, {
        validators: [Validators.maxLength(150)],
      }),
      socorro: new FormControl(doencaRawValue.socorro, {
        validators: [Validators.maxLength(150)],
      }),
      obs: new FormControl(doencaRawValue.obs, {
        validators: [Validators.maxLength(50)],
      }),
    });
  }

  getDoenca(form: DoencaFormGroup): IDoenca | NewDoenca {
    return form.getRawValue() as IDoenca | NewDoenca;
  }

  resetForm(form: DoencaFormGroup, doenca: DoencaFormGroupInput): void {
    const doencaRawValue = { ...this.getFormDefaults(), ...doenca };
    form.reset(
      {
        ...doencaRawValue,
        id: { value: doencaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DoencaFormDefaults {
    return {
      id: null,
    };
  }
}
