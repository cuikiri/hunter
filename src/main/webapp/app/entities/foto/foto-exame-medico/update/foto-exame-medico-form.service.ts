import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFotoExameMedico, NewFotoExameMedico } from '../foto-exame-medico.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFotoExameMedico for edit and NewFotoExameMedicoFormGroupInput for create.
 */
type FotoExameMedicoFormGroupInput = IFotoExameMedico | PartialWithRequiredKeyOf<NewFotoExameMedico>;

type FotoExameMedicoFormDefaults = Pick<NewFotoExameMedico, 'id'>;

type FotoExameMedicoFormGroupContent = {
  id: FormControl<IFotoExameMedico['id'] | NewFotoExameMedico['id']>;
  foto: FormControl<IFotoExameMedico['foto']>;
  fotoContentType: FormControl<IFotoExameMedico['fotoContentType']>;
  exameMedico: FormControl<IFotoExameMedico['exameMedico']>;
};

export type FotoExameMedicoFormGroup = FormGroup<FotoExameMedicoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FotoExameMedicoFormService {
  createFotoExameMedicoFormGroup(fotoExameMedico: FotoExameMedicoFormGroupInput = { id: null }): FotoExameMedicoFormGroup {
    const fotoExameMedicoRawValue = {
      ...this.getFormDefaults(),
      ...fotoExameMedico,
    };
    return new FormGroup<FotoExameMedicoFormGroupContent>({
      id: new FormControl(
        { value: fotoExameMedicoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      foto: new FormControl(fotoExameMedicoRawValue.foto, {
        validators: [Validators.required],
      }),
      fotoContentType: new FormControl(fotoExameMedicoRawValue.fotoContentType),
      exameMedico: new FormControl(fotoExameMedicoRawValue.exameMedico),
    });
  }

  getFotoExameMedico(form: FotoExameMedicoFormGroup): IFotoExameMedico | NewFotoExameMedico {
    return form.getRawValue() as IFotoExameMedico | NewFotoExameMedico;
  }

  resetForm(form: FotoExameMedicoFormGroup, fotoExameMedico: FotoExameMedicoFormGroupInput): void {
    const fotoExameMedicoRawValue = { ...this.getFormDefaults(), ...fotoExameMedico };
    form.reset(
      {
        ...fotoExameMedicoRawValue,
        id: { value: fotoExameMedicoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FotoExameMedicoFormDefaults {
    return {
      id: null,
    };
  }
}
