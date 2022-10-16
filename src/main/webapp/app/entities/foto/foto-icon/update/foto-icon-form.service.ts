import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFotoIcon, NewFotoIcon } from '../foto-icon.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFotoIcon for edit and NewFotoIconFormGroupInput for create.
 */
type FotoIconFormGroupInput = IFotoIcon | PartialWithRequiredKeyOf<NewFotoIcon>;

type FotoIconFormDefaults = Pick<NewFotoIcon, 'id'>;

type FotoIconFormGroupContent = {
  id: FormControl<IFotoIcon['id'] | NewFotoIcon['id']>;
  conteudo: FormControl<IFotoIcon['conteudo']>;
  conteudoContentType: FormControl<IFotoIcon['conteudoContentType']>;
};

export type FotoIconFormGroup = FormGroup<FotoIconFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FotoIconFormService {
  createFotoIconFormGroup(fotoIcon: FotoIconFormGroupInput = { id: null }): FotoIconFormGroup {
    const fotoIconRawValue = {
      ...this.getFormDefaults(),
      ...fotoIcon,
    };
    return new FormGroup<FotoIconFormGroupContent>({
      id: new FormControl(
        { value: fotoIconRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      conteudo: new FormControl(fotoIconRawValue.conteudo, {
        validators: [Validators.required],
      }),
      conteudoContentType: new FormControl(fotoIconRawValue.conteudoContentType),
    });
  }

  getFotoIcon(form: FotoIconFormGroup): IFotoIcon | NewFotoIcon {
    return form.getRawValue() as IFotoIcon | NewFotoIcon;
  }

  resetForm(form: FotoIconFormGroup, fotoIcon: FotoIconFormGroupInput): void {
    const fotoIconRawValue = { ...this.getFormDefaults(), ...fotoIcon };
    form.reset(
      {
        ...fotoIconRawValue,
        id: { value: fotoIconRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FotoIconFormDefaults {
    return {
      id: null,
    };
  }
}
