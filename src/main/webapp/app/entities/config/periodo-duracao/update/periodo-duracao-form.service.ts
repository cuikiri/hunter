import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPeriodoDuracao, NewPeriodoDuracao } from '../periodo-duracao.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPeriodoDuracao for edit and NewPeriodoDuracaoFormGroupInput for create.
 */
type PeriodoDuracaoFormGroupInput = IPeriodoDuracao | PartialWithRequiredKeyOf<NewPeriodoDuracao>;

type PeriodoDuracaoFormDefaults = Pick<NewPeriodoDuracao, 'id'>;

type PeriodoDuracaoFormGroupContent = {
  id: FormControl<IPeriodoDuracao['id'] | NewPeriodoDuracao['id']>;
  nome: FormControl<IPeriodoDuracao['nome']>;
  dataInicio: FormControl<IPeriodoDuracao['dataInicio']>;
  dataFim: FormControl<IPeriodoDuracao['dataFim']>;
  horaInicio: FormControl<IPeriodoDuracao['horaInicio']>;
  horaFim: FormControl<IPeriodoDuracao['horaFim']>;
  obs: FormControl<IPeriodoDuracao['obs']>;
};

export type PeriodoDuracaoFormGroup = FormGroup<PeriodoDuracaoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PeriodoDuracaoFormService {
  createPeriodoDuracaoFormGroup(periodoDuracao: PeriodoDuracaoFormGroupInput = { id: null }): PeriodoDuracaoFormGroup {
    const periodoDuracaoRawValue = {
      ...this.getFormDefaults(),
      ...periodoDuracao,
    };
    return new FormGroup<PeriodoDuracaoFormGroupContent>({
      id: new FormControl(
        { value: periodoDuracaoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(periodoDuracaoRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      dataInicio: new FormControl(periodoDuracaoRawValue.dataInicio, {
        validators: [Validators.required],
      }),
      dataFim: new FormControl(periodoDuracaoRawValue.dataFim, {
        validators: [Validators.required],
      }),
      horaInicio: new FormControl(periodoDuracaoRawValue.horaInicio, {
        validators: [Validators.maxLength(5)],
      }),
      horaFim: new FormControl(periodoDuracaoRawValue.horaFim, {
        validators: [Validators.maxLength(5)],
      }),
      obs: new FormControl(periodoDuracaoRawValue.obs, {
        validators: [Validators.maxLength(100)],
      }),
    });
  }

  getPeriodoDuracao(form: PeriodoDuracaoFormGroup): IPeriodoDuracao | NewPeriodoDuracao {
    return form.getRawValue() as IPeriodoDuracao | NewPeriodoDuracao;
  }

  resetForm(form: PeriodoDuracaoFormGroup, periodoDuracao: PeriodoDuracaoFormGroupInput): void {
    const periodoDuracaoRawValue = { ...this.getFormDefaults(), ...periodoDuracao };
    form.reset(
      {
        ...periodoDuracaoRawValue,
        id: { value: periodoDuracaoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PeriodoDuracaoFormDefaults {
    return {
      id: null,
    };
  }
}
