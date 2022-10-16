import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAcompanhamentoAluno, NewAcompanhamentoAluno } from '../acompanhamento-aluno.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAcompanhamentoAluno for edit and NewAcompanhamentoAlunoFormGroupInput for create.
 */
type AcompanhamentoAlunoFormGroupInput = IAcompanhamentoAluno | PartialWithRequiredKeyOf<NewAcompanhamentoAluno>;

type AcompanhamentoAlunoFormDefaults = Pick<NewAcompanhamentoAluno, 'id'>;

type AcompanhamentoAlunoFormGroupContent = {
  id: FormControl<IAcompanhamentoAluno['id'] | NewAcompanhamentoAluno['id']>;
  ano: FormControl<IAcompanhamentoAluno['ano']>;
  ensino: FormControl<IAcompanhamentoAluno['ensino']>;
  bimestre: FormControl<IAcompanhamentoAluno['bimestre']>;
  dadosPessoais: FormControl<IAcompanhamentoAluno['dadosPessoais']>;
};

export type AcompanhamentoAlunoFormGroup = FormGroup<AcompanhamentoAlunoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AcompanhamentoAlunoFormService {
  createAcompanhamentoAlunoFormGroup(acompanhamentoAluno: AcompanhamentoAlunoFormGroupInput = { id: null }): AcompanhamentoAlunoFormGroup {
    const acompanhamentoAlunoRawValue = {
      ...this.getFormDefaults(),
      ...acompanhamentoAluno,
    };
    return new FormGroup<AcompanhamentoAlunoFormGroupContent>({
      id: new FormControl(
        { value: acompanhamentoAlunoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      ano: new FormControl(acompanhamentoAlunoRawValue.ano, {
        validators: [Validators.required],
      }),
      ensino: new FormControl(acompanhamentoAlunoRawValue.ensino, {
        validators: [Validators.required],
      }),
      bimestre: new FormControl(acompanhamentoAlunoRawValue.bimestre, {
        validators: [Validators.required],
      }),
      dadosPessoais: new FormControl(acompanhamentoAlunoRawValue.dadosPessoais),
    });
  }

  getAcompanhamentoAluno(form: AcompanhamentoAlunoFormGroup): IAcompanhamentoAluno | NewAcompanhamentoAluno {
    return form.getRawValue() as IAcompanhamentoAluno | NewAcompanhamentoAluno;
  }

  resetForm(form: AcompanhamentoAlunoFormGroup, acompanhamentoAluno: AcompanhamentoAlunoFormGroupInput): void {
    const acompanhamentoAlunoRawValue = { ...this.getFormDefaults(), ...acompanhamentoAluno };
    form.reset(
      {
        ...acompanhamentoAlunoRawValue,
        id: { value: acompanhamentoAlunoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AcompanhamentoAlunoFormDefaults {
    return {
      id: null,
    };
  }
}
