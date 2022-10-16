import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEvento, NewEvento } from '../evento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEvento for edit and NewEventoFormGroupInput for create.
 */
type EventoFormGroupInput = IEvento | PartialWithRequiredKeyOf<NewEvento>;

type EventoFormDefaults = Pick<NewEvento, 'id' | 'ativo'>;

type EventoFormGroupContent = {
  id: FormControl<IEvento['id'] | NewEvento['id']>;
  nome: FormControl<IEvento['nome']>;
  descricao: FormControl<IEvento['descricao']>;
  ativo: FormControl<IEvento['ativo']>;
  obs: FormControl<IEvento['obs']>;
  periodoDuracao: FormControl<IEvento['periodoDuracao']>;
  dadosPessoais: FormControl<IEvento['dadosPessoais']>;
};

export type EventoFormGroup = FormGroup<EventoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EventoFormService {
  createEventoFormGroup(evento: EventoFormGroupInput = { id: null }): EventoFormGroup {
    const eventoRawValue = {
      ...this.getFormDefaults(),
      ...evento,
    };
    return new FormGroup<EventoFormGroupContent>({
      id: new FormControl(
        { value: eventoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(eventoRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      descricao: new FormControl(eventoRawValue.descricao, {
        validators: [Validators.maxLength(100)],
      }),
      ativo: new FormControl(eventoRawValue.ativo),
      obs: new FormControl(eventoRawValue.obs, {
        validators: [Validators.maxLength(100)],
      }),
      periodoDuracao: new FormControl(eventoRawValue.periodoDuracao),
      dadosPessoais: new FormControl(eventoRawValue.dadosPessoais),
    });
  }

  getEvento(form: EventoFormGroup): IEvento | NewEvento {
    return form.getRawValue() as IEvento | NewEvento;
  }

  resetForm(form: EventoFormGroup, evento: EventoFormGroupInput): void {
    const eventoRawValue = { ...this.getFormDefaults(), ...evento };
    form.reset(
      {
        ...eventoRawValue,
        id: { value: eventoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EventoFormDefaults {
    return {
      id: null,
      ativo: false,
    };
  }
}
