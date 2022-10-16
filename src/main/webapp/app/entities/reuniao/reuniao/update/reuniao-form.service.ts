import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IReuniao, NewReuniao } from '../reuniao.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReuniao for edit and NewReuniaoFormGroupInput for create.
 */
type ReuniaoFormGroupInput = IReuniao | PartialWithRequiredKeyOf<NewReuniao>;

type ReuniaoFormDefaults = Pick<NewReuniao, 'id'>;

type ReuniaoFormGroupContent = {
  id: FormControl<IReuniao['id'] | NewReuniao['id']>;
  nome: FormControl<IReuniao['nome']>;
  descricao: FormControl<IReuniao['descricao']>;
  data: FormControl<IReuniao['data']>;
  dataInicio: FormControl<IReuniao['dataInicio']>;
  dataFim: FormControl<IReuniao['dataFim']>;
  horaInicio: FormControl<IReuniao['horaInicio']>;
  horaFim: FormControl<IReuniao['horaFim']>;
  tipoReuniao: FormControl<IReuniao['tipoReuniao']>;
  obs: FormControl<IReuniao['obs']>;
};

export type ReuniaoFormGroup = FormGroup<ReuniaoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReuniaoFormService {
  createReuniaoFormGroup(reuniao: ReuniaoFormGroupInput = { id: null }): ReuniaoFormGroup {
    const reuniaoRawValue = {
      ...this.getFormDefaults(),
      ...reuniao,
    };
    return new FormGroup<ReuniaoFormGroupContent>({
      id: new FormControl(
        { value: reuniaoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(reuniaoRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      descricao: new FormControl(reuniaoRawValue.descricao, {
        validators: [Validators.required, Validators.maxLength(1000)],
      }),
      data: new FormControl(reuniaoRawValue.data, {
        validators: [Validators.required],
      }),
      dataInicio: new FormControl(reuniaoRawValue.dataInicio),
      dataFim: new FormControl(reuniaoRawValue.dataFim),
      horaInicio: new FormControl(reuniaoRawValue.horaInicio, {
        validators: [Validators.maxLength(5)],
      }),
      horaFim: new FormControl(reuniaoRawValue.horaFim, {
        validators: [Validators.maxLength(5)],
      }),
      tipoReuniao: new FormControl(reuniaoRawValue.tipoReuniao),
      obs: new FormControl(reuniaoRawValue.obs, {
        validators: [Validators.maxLength(100)],
      }),
    });
  }

  getReuniao(form: ReuniaoFormGroup): IReuniao | NewReuniao {
    return form.getRawValue() as IReuniao | NewReuniao;
  }

  resetForm(form: ReuniaoFormGroup, reuniao: ReuniaoFormGroupInput): void {
    const reuniaoRawValue = { ...this.getFormDefaults(), ...reuniao };
    form.reset(
      {
        ...reuniaoRawValue,
        id: { value: reuniaoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ReuniaoFormDefaults {
    return {
      id: null,
    };
  }
}
