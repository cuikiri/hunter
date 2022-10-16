import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFotoPagar, NewFotoPagar } from '../foto-pagar.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFotoPagar for edit and NewFotoPagarFormGroupInput for create.
 */
type FotoPagarFormGroupInput = IFotoPagar | PartialWithRequiredKeyOf<NewFotoPagar>;

type FotoPagarFormDefaults = Pick<NewFotoPagar, 'id'>;

type FotoPagarFormGroupContent = {
  id: FormControl<IFotoPagar['id'] | NewFotoPagar['id']>;
  conteudo: FormControl<IFotoPagar['conteudo']>;
  conteudoContentType: FormControl<IFotoPagar['conteudoContentType']>;
  pagar: FormControl<IFotoPagar['pagar']>;
};

export type FotoPagarFormGroup = FormGroup<FotoPagarFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FotoPagarFormService {
  createFotoPagarFormGroup(fotoPagar: FotoPagarFormGroupInput = { id: null }): FotoPagarFormGroup {
    const fotoPagarRawValue = {
      ...this.getFormDefaults(),
      ...fotoPagar,
    };
    return new FormGroup<FotoPagarFormGroupContent>({
      id: new FormControl(
        { value: fotoPagarRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      conteudo: new FormControl(fotoPagarRawValue.conteudo, {
        validators: [Validators.required],
      }),
      conteudoContentType: new FormControl(fotoPagarRawValue.conteudoContentType),
      pagar: new FormControl(fotoPagarRawValue.pagar),
    });
  }

  getFotoPagar(form: FotoPagarFormGroup): IFotoPagar | NewFotoPagar {
    return form.getRawValue() as IFotoPagar | NewFotoPagar;
  }

  resetForm(form: FotoPagarFormGroup, fotoPagar: FotoPagarFormGroupInput): void {
    const fotoPagarRawValue = { ...this.getFormDefaults(), ...fotoPagar };
    form.reset(
      {
        ...fotoPagarRawValue,
        id: { value: fotoPagarRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FotoPagarFormDefaults {
    return {
      id: null,
    };
  }
}
