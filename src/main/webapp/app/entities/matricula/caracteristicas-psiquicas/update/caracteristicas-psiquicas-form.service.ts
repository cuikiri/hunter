import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICaracteristicasPsiquicas, NewCaracteristicasPsiquicas } from '../caracteristicas-psiquicas.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICaracteristicasPsiquicas for edit and NewCaracteristicasPsiquicasFormGroupInput for create.
 */
type CaracteristicasPsiquicasFormGroupInput = ICaracteristicasPsiquicas | PartialWithRequiredKeyOf<NewCaracteristicasPsiquicas>;

type CaracteristicasPsiquicasFormDefaults = Pick<NewCaracteristicasPsiquicas, 'id'>;

type CaracteristicasPsiquicasFormGroupContent = {
  id: FormControl<ICaracteristicasPsiquicas['id'] | NewCaracteristicasPsiquicas['id']>;
  nome: FormControl<ICaracteristicasPsiquicas['nome']>;
  dadosPessoais: FormControl<ICaracteristicasPsiquicas['dadosPessoais']>;
};

export type CaracteristicasPsiquicasFormGroup = FormGroup<CaracteristicasPsiquicasFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CaracteristicasPsiquicasFormService {
  createCaracteristicasPsiquicasFormGroup(
    caracteristicasPsiquicas: CaracteristicasPsiquicasFormGroupInput = { id: null }
  ): CaracteristicasPsiquicasFormGroup {
    const caracteristicasPsiquicasRawValue = {
      ...this.getFormDefaults(),
      ...caracteristicasPsiquicas,
    };
    return new FormGroup<CaracteristicasPsiquicasFormGroupContent>({
      id: new FormControl(
        { value: caracteristicasPsiquicasRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(caracteristicasPsiquicasRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      dadosPessoais: new FormControl(caracteristicasPsiquicasRawValue.dadosPessoais),
    });
  }

  getCaracteristicasPsiquicas(form: CaracteristicasPsiquicasFormGroup): ICaracteristicasPsiquicas | NewCaracteristicasPsiquicas {
    return form.getRawValue() as ICaracteristicasPsiquicas | NewCaracteristicasPsiquicas;
  }

  resetForm(form: CaracteristicasPsiquicasFormGroup, caracteristicasPsiquicas: CaracteristicasPsiquicasFormGroupInput): void {
    const caracteristicasPsiquicasRawValue = { ...this.getFormDefaults(), ...caracteristicasPsiquicas };
    form.reset(
      {
        ...caracteristicasPsiquicasRawValue,
        id: { value: caracteristicasPsiquicasRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CaracteristicasPsiquicasFormDefaults {
    return {
      id: null,
    };
  }
}
