import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAgendaColaborador, NewAgendaColaborador } from '../agenda-colaborador.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAgendaColaborador for edit and NewAgendaColaboradorFormGroupInput for create.
 */
type AgendaColaboradorFormGroupInput = IAgendaColaborador | PartialWithRequiredKeyOf<NewAgendaColaborador>;

type AgendaColaboradorFormDefaults = Pick<NewAgendaColaborador, 'id'>;

type AgendaColaboradorFormGroupContent = {
  id: FormControl<IAgendaColaborador['id'] | NewAgendaColaborador['id']>;
  nome: FormControl<IAgendaColaborador['nome']>;
  obs: FormControl<IAgendaColaborador['obs']>;
  periodoDuracao: FormControl<IAgendaColaborador['periodoDuracao']>;
  colaborador: FormControl<IAgendaColaborador['colaborador']>;
};

export type AgendaColaboradorFormGroup = FormGroup<AgendaColaboradorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AgendaColaboradorFormService {
  createAgendaColaboradorFormGroup(agendaColaborador: AgendaColaboradorFormGroupInput = { id: null }): AgendaColaboradorFormGroup {
    const agendaColaboradorRawValue = {
      ...this.getFormDefaults(),
      ...agendaColaborador,
    };
    return new FormGroup<AgendaColaboradorFormGroupContent>({
      id: new FormControl(
        { value: agendaColaboradorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(agendaColaboradorRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      obs: new FormControl(agendaColaboradorRawValue.obs, {
        validators: [Validators.maxLength(100)],
      }),
      periodoDuracao: new FormControl(agendaColaboradorRawValue.periodoDuracao),
      colaborador: new FormControl(agendaColaboradorRawValue.colaborador),
    });
  }

  getAgendaColaborador(form: AgendaColaboradorFormGroup): IAgendaColaborador | NewAgendaColaborador {
    return form.getRawValue() as IAgendaColaborador | NewAgendaColaborador;
  }

  resetForm(form: AgendaColaboradorFormGroup, agendaColaborador: AgendaColaboradorFormGroupInput): void {
    const agendaColaboradorRawValue = { ...this.getFormDefaults(), ...agendaColaborador };
    form.reset(
      {
        ...agendaColaboradorRawValue,
        id: { value: agendaColaboradorRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AgendaColaboradorFormDefaults {
    return {
      id: null,
    };
  }
}
