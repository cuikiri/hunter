import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IExameMedico, NewExameMedico } from '../exame-medico.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IExameMedico for edit and NewExameMedicoFormGroupInput for create.
 */
type ExameMedicoFormGroupInput = IExameMedico | PartialWithRequiredKeyOf<NewExameMedico>;

type ExameMedicoFormDefaults = Pick<NewExameMedico, 'id'>;

type ExameMedicoFormGroupContent = {
  id: FormControl<IExameMedico['id'] | NewExameMedico['id']>;
  data: FormControl<IExameMedico['data']>;
  nomeMedico: FormControl<IExameMedico['nomeMedico']>;
  crmMedico: FormControl<IExameMedico['crmMedico']>;
  resumo: FormControl<IExameMedico['resumo']>;
  obs: FormControl<IExameMedico['obs']>;
  dadosPessoais: FormControl<IExameMedico['dadosPessoais']>;
};

export type ExameMedicoFormGroup = FormGroup<ExameMedicoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ExameMedicoFormService {
  createExameMedicoFormGroup(exameMedico: ExameMedicoFormGroupInput = { id: null }): ExameMedicoFormGroup {
    const exameMedicoRawValue = {
      ...this.getFormDefaults(),
      ...exameMedico,
    };
    return new FormGroup<ExameMedicoFormGroupContent>({
      id: new FormControl(
        { value: exameMedicoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      data: new FormControl(exameMedicoRawValue.data, {
        validators: [Validators.required],
      }),
      nomeMedico: new FormControl(exameMedicoRawValue.nomeMedico, {
        validators: [Validators.maxLength(50)],
      }),
      crmMedico: new FormControl(exameMedicoRawValue.crmMedico, {
        validators: [Validators.maxLength(20)],
      }),
      resumo: new FormControl(exameMedicoRawValue.resumo, {
        validators: [Validators.maxLength(200)],
      }),
      obs: new FormControl(exameMedicoRawValue.obs, {
        validators: [Validators.maxLength(100)],
      }),
      dadosPessoais: new FormControl(exameMedicoRawValue.dadosPessoais),
    });
  }

  getExameMedico(form: ExameMedicoFormGroup): IExameMedico | NewExameMedico {
    return form.getRawValue() as IExameMedico | NewExameMedico;
  }

  resetForm(form: ExameMedicoFormGroup, exameMedico: ExameMedicoFormGroupInput): void {
    const exameMedicoRawValue = { ...this.getFormDefaults(), ...exameMedico };
    form.reset(
      {
        ...exameMedicoRawValue,
        id: { value: exameMedicoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ExameMedicoFormDefaults {
    return {
      id: null,
    };
  }
}
