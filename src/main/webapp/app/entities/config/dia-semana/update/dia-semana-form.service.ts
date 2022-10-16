import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDiaSemana, NewDiaSemana } from '../dia-semana.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDiaSemana for edit and NewDiaSemanaFormGroupInput for create.
 */
type DiaSemanaFormGroupInput = IDiaSemana | PartialWithRequiredKeyOf<NewDiaSemana>;

type DiaSemanaFormDefaults = Pick<NewDiaSemana, 'id'>;

type DiaSemanaFormGroupContent = {
  id: FormControl<IDiaSemana['id'] | NewDiaSemana['id']>;
  nome: FormControl<IDiaSemana['nome']>;
  obs: FormControl<IDiaSemana['obs']>;
  periodoDuracao: FormControl<IDiaSemana['periodoDuracao']>;
};

export type DiaSemanaFormGroup = FormGroup<DiaSemanaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DiaSemanaFormService {
  createDiaSemanaFormGroup(diaSemana: DiaSemanaFormGroupInput = { id: null }): DiaSemanaFormGroup {
    const diaSemanaRawValue = {
      ...this.getFormDefaults(),
      ...diaSemana,
    };
    return new FormGroup<DiaSemanaFormGroupContent>({
      id: new FormControl(
        { value: diaSemanaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(diaSemanaRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      obs: new FormControl(diaSemanaRawValue.obs, {
        validators: [Validators.maxLength(100)],
      }),
      periodoDuracao: new FormControl(diaSemanaRawValue.periodoDuracao),
    });
  }

  getDiaSemana(form: DiaSemanaFormGroup): IDiaSemana | NewDiaSemana {
    return form.getRawValue() as IDiaSemana | NewDiaSemana;
  }

  resetForm(form: DiaSemanaFormGroup, diaSemana: DiaSemanaFormGroupInput): void {
    const diaSemanaRawValue = { ...this.getFormDefaults(), ...diaSemana };
    form.reset(
      {
        ...diaSemanaRawValue,
        id: { value: diaSemanaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DiaSemanaFormDefaults {
    return {
      id: null,
    };
  }
}
