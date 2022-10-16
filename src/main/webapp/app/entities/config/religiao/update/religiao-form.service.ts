import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IReligiao, NewReligiao } from '../religiao.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReligiao for edit and NewReligiaoFormGroupInput for create.
 */
type ReligiaoFormGroupInput = IReligiao | PartialWithRequiredKeyOf<NewReligiao>;

type ReligiaoFormDefaults = Pick<NewReligiao, 'id'>;

type ReligiaoFormGroupContent = {
  id: FormControl<IReligiao['id'] | NewReligiao['id']>;
  codigo: FormControl<IReligiao['codigo']>;
  descricao: FormControl<IReligiao['descricao']>;
};

export type ReligiaoFormGroup = FormGroup<ReligiaoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReligiaoFormService {
  createReligiaoFormGroup(religiao: ReligiaoFormGroupInput = { id: null }): ReligiaoFormGroup {
    const religiaoRawValue = {
      ...this.getFormDefaults(),
      ...religiao,
    };
    return new FormGroup<ReligiaoFormGroupContent>({
      id: new FormControl(
        { value: religiaoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(religiaoRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(20)],
      }),
      descricao: new FormControl(religiaoRawValue.descricao, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
      }),
    });
  }

  getReligiao(form: ReligiaoFormGroup): IReligiao | NewReligiao {
    return form.getRawValue() as IReligiao | NewReligiao;
  }

  resetForm(form: ReligiaoFormGroup, religiao: ReligiaoFormGroupInput): void {
    const religiaoRawValue = { ...this.getFormDefaults(), ...religiao };
    form.reset(
      {
        ...religiaoRawValue,
        id: { value: religiaoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ReligiaoFormDefaults {
    return {
      id: null,
    };
  }
}
