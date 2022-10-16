import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFotoReceber, NewFotoReceber } from '../foto-receber.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFotoReceber for edit and NewFotoReceberFormGroupInput for create.
 */
type FotoReceberFormGroupInput = IFotoReceber | PartialWithRequiredKeyOf<NewFotoReceber>;

type FotoReceberFormDefaults = Pick<NewFotoReceber, 'id'>;

type FotoReceberFormGroupContent = {
  id: FormControl<IFotoReceber['id'] | NewFotoReceber['id']>;
  conteudo: FormControl<IFotoReceber['conteudo']>;
  conteudoContentType: FormControl<IFotoReceber['conteudoContentType']>;
  receber: FormControl<IFotoReceber['receber']>;
};

export type FotoReceberFormGroup = FormGroup<FotoReceberFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FotoReceberFormService {
  createFotoReceberFormGroup(fotoReceber: FotoReceberFormGroupInput = { id: null }): FotoReceberFormGroup {
    const fotoReceberRawValue = {
      ...this.getFormDefaults(),
      ...fotoReceber,
    };
    return new FormGroup<FotoReceberFormGroupContent>({
      id: new FormControl(
        { value: fotoReceberRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      conteudo: new FormControl(fotoReceberRawValue.conteudo, {
        validators: [Validators.required],
      }),
      conteudoContentType: new FormControl(fotoReceberRawValue.conteudoContentType),
      receber: new FormControl(fotoReceberRawValue.receber),
    });
  }

  getFotoReceber(form: FotoReceberFormGroup): IFotoReceber | NewFotoReceber {
    return form.getRawValue() as IFotoReceber | NewFotoReceber;
  }

  resetForm(form: FotoReceberFormGroup, fotoReceber: FotoReceberFormGroupInput): void {
    const fotoReceberRawValue = { ...this.getFormDefaults(), ...fotoReceber };
    form.reset(
      {
        ...fotoReceberRawValue,
        id: { value: fotoReceberRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FotoReceberFormDefaults {
    return {
      id: null,
    };
  }
}
