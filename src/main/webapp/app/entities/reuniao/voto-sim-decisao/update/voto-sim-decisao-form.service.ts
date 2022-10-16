import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IVotoSimDecisao, NewVotoSimDecisao } from '../voto-sim-decisao.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVotoSimDecisao for edit and NewVotoSimDecisaoFormGroupInput for create.
 */
type VotoSimDecisaoFormGroupInput = IVotoSimDecisao | PartialWithRequiredKeyOf<NewVotoSimDecisao>;

type VotoSimDecisaoFormDefaults = Pick<NewVotoSimDecisao, 'id'>;

type VotoSimDecisaoFormGroupContent = {
  id: FormControl<IVotoSimDecisao['id'] | NewVotoSimDecisao['id']>;
  nome: FormControl<IVotoSimDecisao['nome']>;
  obs: FormControl<IVotoSimDecisao['obs']>;
  decisao: FormControl<IVotoSimDecisao['decisao']>;
};

export type VotoSimDecisaoFormGroup = FormGroup<VotoSimDecisaoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VotoSimDecisaoFormService {
  createVotoSimDecisaoFormGroup(votoSimDecisao: VotoSimDecisaoFormGroupInput = { id: null }): VotoSimDecisaoFormGroup {
    const votoSimDecisaoRawValue = {
      ...this.getFormDefaults(),
      ...votoSimDecisao,
    };
    return new FormGroup<VotoSimDecisaoFormGroupContent>({
      id: new FormControl(
        { value: votoSimDecisaoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(votoSimDecisaoRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      obs: new FormControl(votoSimDecisaoRawValue.obs, {
        validators: [Validators.maxLength(100)],
      }),
      decisao: new FormControl(votoSimDecisaoRawValue.decisao),
    });
  }

  getVotoSimDecisao(form: VotoSimDecisaoFormGroup): IVotoSimDecisao | NewVotoSimDecisao {
    return form.getRawValue() as IVotoSimDecisao | NewVotoSimDecisao;
  }

  resetForm(form: VotoSimDecisaoFormGroup, votoSimDecisao: VotoSimDecisaoFormGroupInput): void {
    const votoSimDecisaoRawValue = { ...this.getFormDefaults(), ...votoSimDecisao };
    form.reset(
      {
        ...votoSimDecisaoRawValue,
        id: { value: votoSimDecisaoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): VotoSimDecisaoFormDefaults {
    return {
      id: null,
    };
  }
}
