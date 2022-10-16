import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IVotoNaoDecisao, NewVotoNaoDecisao } from '../voto-nao-decisao.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVotoNaoDecisao for edit and NewVotoNaoDecisaoFormGroupInput for create.
 */
type VotoNaoDecisaoFormGroupInput = IVotoNaoDecisao | PartialWithRequiredKeyOf<NewVotoNaoDecisao>;

type VotoNaoDecisaoFormDefaults = Pick<NewVotoNaoDecisao, 'id'>;

type VotoNaoDecisaoFormGroupContent = {
  id: FormControl<IVotoNaoDecisao['id'] | NewVotoNaoDecisao['id']>;
  nome: FormControl<IVotoNaoDecisao['nome']>;
  obs: FormControl<IVotoNaoDecisao['obs']>;
  decisao: FormControl<IVotoNaoDecisao['decisao']>;
};

export type VotoNaoDecisaoFormGroup = FormGroup<VotoNaoDecisaoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VotoNaoDecisaoFormService {
  createVotoNaoDecisaoFormGroup(votoNaoDecisao: VotoNaoDecisaoFormGroupInput = { id: null }): VotoNaoDecisaoFormGroup {
    const votoNaoDecisaoRawValue = {
      ...this.getFormDefaults(),
      ...votoNaoDecisao,
    };
    return new FormGroup<VotoNaoDecisaoFormGroupContent>({
      id: new FormControl(
        { value: votoNaoDecisaoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(votoNaoDecisaoRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      obs: new FormControl(votoNaoDecisaoRawValue.obs, {
        validators: [Validators.maxLength(100)],
      }),
      decisao: new FormControl(votoNaoDecisaoRawValue.decisao),
    });
  }

  getVotoNaoDecisao(form: VotoNaoDecisaoFormGroup): IVotoNaoDecisao | NewVotoNaoDecisao {
    return form.getRawValue() as IVotoNaoDecisao | NewVotoNaoDecisao;
  }

  resetForm(form: VotoNaoDecisaoFormGroup, votoNaoDecisao: VotoNaoDecisaoFormGroupInput): void {
    const votoNaoDecisaoRawValue = { ...this.getFormDefaults(), ...votoNaoDecisao };
    form.reset(
      {
        ...votoNaoDecisaoRawValue,
        id: { value: votoNaoDecisaoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): VotoNaoDecisaoFormDefaults {
    return {
      id: null,
    };
  }
}
