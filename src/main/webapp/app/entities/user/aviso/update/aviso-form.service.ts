import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAviso, NewAviso } from '../aviso.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAviso for edit and NewAvisoFormGroupInput for create.
 */
type AvisoFormGroupInput = IAviso | PartialWithRequiredKeyOf<NewAviso>;

type AvisoFormDefaults = Pick<NewAviso, 'id'>;

type AvisoFormGroupContent = {
  id: FormControl<IAviso['id'] | NewAviso['id']>;
  data: FormControl<IAviso['data']>;
  titulo: FormControl<IAviso['titulo']>;
  conteudo: FormControl<IAviso['conteudo']>;
  dadosPessoais: FormControl<IAviso['dadosPessoais']>;
};

export type AvisoFormGroup = FormGroup<AvisoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AvisoFormService {
  createAvisoFormGroup(aviso: AvisoFormGroupInput = { id: null }): AvisoFormGroup {
    const avisoRawValue = {
      ...this.getFormDefaults(),
      ...aviso,
    };
    return new FormGroup<AvisoFormGroupContent>({
      id: new FormControl(
        { value: avisoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      data: new FormControl(avisoRawValue.data, {
        validators: [Validators.required],
      }),
      titulo: new FormControl(avisoRawValue.titulo, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(40)],
      }),
      conteudo: new FormControl(avisoRawValue.conteudo, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(1000)],
      }),
      dadosPessoais: new FormControl(avisoRawValue.dadosPessoais),
    });
  }

  getAviso(form: AvisoFormGroup): IAviso | NewAviso {
    return form.getRawValue() as IAviso | NewAviso;
  }

  resetForm(form: AvisoFormGroup, aviso: AvisoFormGroupInput): void {
    const avisoRawValue = { ...this.getFormDefaults(), ...aviso };
    form.reset(
      {
        ...avisoRawValue,
        id: { value: avisoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AvisoFormDefaults {
    return {
      id: null,
    };
  }
}
