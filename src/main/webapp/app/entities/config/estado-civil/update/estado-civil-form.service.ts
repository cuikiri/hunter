import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEstadoCivil, NewEstadoCivil } from '../estado-civil.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEstadoCivil for edit and NewEstadoCivilFormGroupInput for create.
 */
type EstadoCivilFormGroupInput = IEstadoCivil | PartialWithRequiredKeyOf<NewEstadoCivil>;

type EstadoCivilFormDefaults = Pick<NewEstadoCivil, 'id'>;

type EstadoCivilFormGroupContent = {
  id: FormControl<IEstadoCivil['id'] | NewEstadoCivil['id']>;
  codigo: FormControl<IEstadoCivil['codigo']>;
  descricao: FormControl<IEstadoCivil['descricao']>;
};

export type EstadoCivilFormGroup = FormGroup<EstadoCivilFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EstadoCivilFormService {
  createEstadoCivilFormGroup(estadoCivil: EstadoCivilFormGroupInput = { id: null }): EstadoCivilFormGroup {
    const estadoCivilRawValue = {
      ...this.getFormDefaults(),
      ...estadoCivil,
    };
    return new FormGroup<EstadoCivilFormGroupContent>({
      id: new FormControl(
        { value: estadoCivilRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(estadoCivilRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(20)],
      }),
      descricao: new FormControl(estadoCivilRawValue.descricao, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
      }),
    });
  }

  getEstadoCivil(form: EstadoCivilFormGroup): IEstadoCivil | NewEstadoCivil {
    return form.getRawValue() as IEstadoCivil | NewEstadoCivil;
  }

  resetForm(form: EstadoCivilFormGroup, estadoCivil: EstadoCivilFormGroupInput): void {
    const estadoCivilRawValue = { ...this.getFormDefaults(), ...estadoCivil };
    form.reset(
      {
        ...estadoCivilRawValue,
        id: { value: estadoCivilRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EstadoCivilFormDefaults {
    return {
      id: null,
    };
  }
}
