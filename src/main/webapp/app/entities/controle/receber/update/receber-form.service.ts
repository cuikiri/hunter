import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IReceber, NewReceber } from '../receber.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReceber for edit and NewReceberFormGroupInput for create.
 */
type ReceberFormGroupInput = IReceber | PartialWithRequiredKeyOf<NewReceber>;

type ReceberFormDefaults = Pick<NewReceber, 'id'>;

type ReceberFormGroupContent = {
  id: FormControl<IReceber['id'] | NewReceber['id']>;
  data: FormControl<IReceber['data']>;
  valor: FormControl<IReceber['valor']>;
  status: FormControl<IReceber['status']>;
  obs: FormControl<IReceber['obs']>;
  tipoReceber: FormControl<IReceber['tipoReceber']>;
  receberDe: FormControl<IReceber['receberDe']>;
  tipoTransacao: FormControl<IReceber['tipoTransacao']>;
  dadosPessoais: FormControl<IReceber['dadosPessoais']>;
};

export type ReceberFormGroup = FormGroup<ReceberFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReceberFormService {
  createReceberFormGroup(receber: ReceberFormGroupInput = { id: null }): ReceberFormGroup {
    const receberRawValue = {
      ...this.getFormDefaults(),
      ...receber,
    };
    return new FormGroup<ReceberFormGroupContent>({
      id: new FormControl(
        { value: receberRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      data: new FormControl(receberRawValue.data, {
        validators: [Validators.required],
      }),
      valor: new FormControl(receberRawValue.valor, {
        validators: [Validators.required],
      }),
      status: new FormControl(receberRawValue.status),
      obs: new FormControl(receberRawValue.obs, {
        validators: [Validators.maxLength(100)],
      }),
      tipoReceber: new FormControl(receberRawValue.tipoReceber),
      receberDe: new FormControl(receberRawValue.receberDe),
      tipoTransacao: new FormControl(receberRawValue.tipoTransacao),
      dadosPessoais: new FormControl(receberRawValue.dadosPessoais),
    });
  }

  getReceber(form: ReceberFormGroup): IReceber | NewReceber {
    return form.getRawValue() as IReceber | NewReceber;
  }

  resetForm(form: ReceberFormGroup, receber: ReceberFormGroupInput): void {
    const receberRawValue = { ...this.getFormDefaults(), ...receber };
    form.reset(
      {
        ...receberRawValue,
        id: { value: receberRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ReceberFormDefaults {
    return {
      id: null,
    };
  }
}
