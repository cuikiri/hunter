import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDadosMedico, NewDadosMedico } from '../dados-medico.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDadosMedico for edit and NewDadosMedicoFormGroupInput for create.
 */
type DadosMedicoFormGroupInput = IDadosMedico | PartialWithRequiredKeyOf<NewDadosMedico>;

type DadosMedicoFormDefaults = Pick<NewDadosMedico, 'id'>;

type DadosMedicoFormGroupContent = {
  id: FormControl<IDadosMedico['id'] | NewDadosMedico['id']>;
  data: FormControl<IDadosMedico['data']>;
  peso: FormControl<IDadosMedico['peso']>;
  altura: FormControl<IDadosMedico['altura']>;
  pressao: FormControl<IDadosMedico['pressao']>;
  coracao: FormControl<IDadosMedico['coracao']>;
  medicacao: FormControl<IDadosMedico['medicacao']>;
  obs: FormControl<IDadosMedico['obs']>;
  vacina: FormControl<IDadosMedico['vacina']>;
  alergia: FormControl<IDadosMedico['alergia']>;
  doenca: FormControl<IDadosMedico['doenca']>;
  dadosPessoais: FormControl<IDadosMedico['dadosPessoais']>;
};

export type DadosMedicoFormGroup = FormGroup<DadosMedicoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DadosMedicoFormService {
  createDadosMedicoFormGroup(dadosMedico: DadosMedicoFormGroupInput = { id: null }): DadosMedicoFormGroup {
    const dadosMedicoRawValue = {
      ...this.getFormDefaults(),
      ...dadosMedico,
    };
    return new FormGroup<DadosMedicoFormGroupContent>({
      id: new FormControl(
        { value: dadosMedicoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      data: new FormControl(dadosMedicoRawValue.data, {
        validators: [Validators.required],
      }),
      peso: new FormControl(dadosMedicoRawValue.peso, {
        validators: [Validators.required],
      }),
      altura: new FormControl(dadosMedicoRawValue.altura, {
        validators: [Validators.required],
      }),
      pressao: new FormControl(dadosMedicoRawValue.pressao, {
        validators: [Validators.required],
      }),
      coracao: new FormControl(dadosMedicoRawValue.coracao, {
        validators: [Validators.required],
      }),
      medicacao: new FormControl(dadosMedicoRawValue.medicacao, {
        validators: [Validators.maxLength(100)],
      }),
      obs: new FormControl(dadosMedicoRawValue.obs, {
        validators: [Validators.maxLength(50)],
      }),
      vacina: new FormControl(dadosMedicoRawValue.vacina),
      alergia: new FormControl(dadosMedicoRawValue.alergia),
      doenca: new FormControl(dadosMedicoRawValue.doenca),
      dadosPessoais: new FormControl(dadosMedicoRawValue.dadosPessoais),
    });
  }

  getDadosMedico(form: DadosMedicoFormGroup): IDadosMedico | NewDadosMedico {
    return form.getRawValue() as IDadosMedico | NewDadosMedico;
  }

  resetForm(form: DadosMedicoFormGroup, dadosMedico: DadosMedicoFormGroupInput): void {
    const dadosMedicoRawValue = { ...this.getFormDefaults(), ...dadosMedico };
    form.reset(
      {
        ...dadosMedicoRawValue,
        id: { value: dadosMedicoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DadosMedicoFormDefaults {
    return {
      id: null,
    };
  }
}
