import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDecisao, NewDecisao } from '../decisao.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDecisao for edit and NewDecisaoFormGroupInput for create.
 */
type DecisaoFormGroupInput = IDecisao | PartialWithRequiredKeyOf<NewDecisao>;

type DecisaoFormDefaults = Pick<NewDecisao, 'id'>;

type DecisaoFormGroupContent = {
  id: FormControl<IDecisao['id'] | NewDecisao['id']>;
  nome: FormControl<IDecisao['nome']>;
  obs: FormControl<IDecisao['obs']>;
  reuniao: FormControl<IDecisao['reuniao']>;
};

export type DecisaoFormGroup = FormGroup<DecisaoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DecisaoFormService {
  createDecisaoFormGroup(decisao: DecisaoFormGroupInput = { id: null }): DecisaoFormGroup {
    const decisaoRawValue = {
      ...this.getFormDefaults(),
      ...decisao,
    };
    return new FormGroup<DecisaoFormGroupContent>({
      id: new FormControl(
        { value: decisaoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(decisaoRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      obs: new FormControl(decisaoRawValue.obs, {
        validators: [Validators.maxLength(100)],
      }),
      reuniao: new FormControl(decisaoRawValue.reuniao),
    });
  }

  getDecisao(form: DecisaoFormGroup): IDecisao | NewDecisao {
    return form.getRawValue() as IDecisao | NewDecisao;
  }

  resetForm(form: DecisaoFormGroup, decisao: DecisaoFormGroupInput): void {
    const decisaoRawValue = { ...this.getFormDefaults(), ...decisao };
    form.reset(
      {
        ...decisaoRawValue,
        id: { value: decisaoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DecisaoFormDefaults {
    return {
      id: null,
    };
  }
}
