import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IColaborador, NewColaborador } from '../colaborador.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IColaborador for edit and NewColaboradorFormGroupInput for create.
 */
type ColaboradorFormGroupInput = IColaborador | PartialWithRequiredKeyOf<NewColaborador>;

type ColaboradorFormDefaults = Pick<NewColaborador, 'id' | 'ativo'>;

type ColaboradorFormGroupContent = {
  id: FormControl<IColaborador['id'] | NewColaborador['id']>;
  dataCadastro: FormControl<IColaborador['dataCadastro']>;
  dataAdmissao: FormControl<IColaborador['dataAdmissao']>;
  dataRecisao: FormControl<IColaborador['dataRecisao']>;
  salario: FormControl<IColaborador['salario']>;
  ativo: FormControl<IColaborador['ativo']>;
  obs: FormControl<IColaborador['obs']>;
  dadosPessoais: FormControl<IColaborador['dadosPessoais']>;
};

export type ColaboradorFormGroup = FormGroup<ColaboradorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ColaboradorFormService {
  createColaboradorFormGroup(colaborador: ColaboradorFormGroupInput = { id: null }): ColaboradorFormGroup {
    const colaboradorRawValue = {
      ...this.getFormDefaults(),
      ...colaborador,
    };
    return new FormGroup<ColaboradorFormGroupContent>({
      id: new FormControl(
        { value: colaboradorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      dataCadastro: new FormControl(colaboradorRawValue.dataCadastro, {
        validators: [Validators.required],
      }),
      dataAdmissao: new FormControl(colaboradorRawValue.dataAdmissao),
      dataRecisao: new FormControl(colaboradorRawValue.dataRecisao),
      salario: new FormControl(colaboradorRawValue.salario),
      ativo: new FormControl(colaboradorRawValue.ativo),
      obs: new FormControl(colaboradorRawValue.obs, {
        validators: [Validators.maxLength(100)],
      }),
      dadosPessoais: new FormControl(colaboradorRawValue.dadosPessoais),
    });
  }

  getColaborador(form: ColaboradorFormGroup): IColaborador | NewColaborador {
    return form.getRawValue() as IColaborador | NewColaborador;
  }

  resetForm(form: ColaboradorFormGroup, colaborador: ColaboradorFormGroupInput): void {
    const colaboradorRawValue = { ...this.getFormDefaults(), ...colaborador };
    form.reset(
      {
        ...colaboradorRawValue,
        id: { value: colaboradorRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ColaboradorFormDefaults {
    return {
      id: null,
      ativo: false,
    };
  }
}
