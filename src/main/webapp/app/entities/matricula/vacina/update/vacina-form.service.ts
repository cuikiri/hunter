import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IVacina, NewVacina } from '../vacina.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVacina for edit and NewVacinaFormGroupInput for create.
 */
type VacinaFormGroupInput = IVacina | PartialWithRequiredKeyOf<NewVacina>;

type VacinaFormDefaults = Pick<NewVacina, 'id'>;

type VacinaFormGroupContent = {
  id: FormControl<IVacina['id'] | NewVacina['id']>;
  nome: FormControl<IVacina['nome']>;
  idade: FormControl<IVacina['idade']>;
  obs: FormControl<IVacina['obs']>;
};

export type VacinaFormGroup = FormGroup<VacinaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VacinaFormService {
  createVacinaFormGroup(vacina: VacinaFormGroupInput = { id: null }): VacinaFormGroup {
    const vacinaRawValue = {
      ...this.getFormDefaults(),
      ...vacina,
    };
    return new FormGroup<VacinaFormGroupContent>({
      id: new FormControl(
        { value: vacinaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(vacinaRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      idade: new FormControl(vacinaRawValue.idade, {
        validators: [Validators.maxLength(5)],
      }),
      obs: new FormControl(vacinaRawValue.obs, {
        validators: [Validators.maxLength(50)],
      }),
    });
  }

  getVacina(form: VacinaFormGroup): IVacina | NewVacina {
    return form.getRawValue() as IVacina | NewVacina;
  }

  resetForm(form: VacinaFormGroup, vacina: VacinaFormGroupInput): void {
    const vacinaRawValue = { ...this.getFormDefaults(), ...vacina };
    form.reset(
      {
        ...vacinaRawValue,
        id: { value: vacinaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): VacinaFormDefaults {
    return {
      id: null,
    };
  }
}
