import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFotoAvatar, NewFotoAvatar } from '../foto-avatar.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFotoAvatar for edit and NewFotoAvatarFormGroupInput for create.
 */
type FotoAvatarFormGroupInput = IFotoAvatar | PartialWithRequiredKeyOf<NewFotoAvatar>;

type FotoAvatarFormDefaults = Pick<NewFotoAvatar, 'id'>;

type FotoAvatarFormGroupContent = {
  id: FormControl<IFotoAvatar['id'] | NewFotoAvatar['id']>;
  conteudo: FormControl<IFotoAvatar['conteudo']>;
  conteudoContentType: FormControl<IFotoAvatar['conteudoContentType']>;
};

export type FotoAvatarFormGroup = FormGroup<FotoAvatarFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FotoAvatarFormService {
  createFotoAvatarFormGroup(fotoAvatar: FotoAvatarFormGroupInput = { id: null }): FotoAvatarFormGroup {
    const fotoAvatarRawValue = {
      ...this.getFormDefaults(),
      ...fotoAvatar,
    };
    return new FormGroup<FotoAvatarFormGroupContent>({
      id: new FormControl(
        { value: fotoAvatarRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      conteudo: new FormControl(fotoAvatarRawValue.conteudo, {
        validators: [Validators.required],
      }),
      conteudoContentType: new FormControl(fotoAvatarRawValue.conteudoContentType),
    });
  }

  getFotoAvatar(form: FotoAvatarFormGroup): IFotoAvatar | NewFotoAvatar {
    return form.getRawValue() as IFotoAvatar | NewFotoAvatar;
  }

  resetForm(form: FotoAvatarFormGroup, fotoAvatar: FotoAvatarFormGroupInput): void {
    const fotoAvatarRawValue = { ...this.getFormDefaults(), ...fotoAvatar };
    form.reset(
      {
        ...fotoAvatarRawValue,
        id: { value: fotoAvatarRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FotoAvatarFormDefaults {
    return {
      id: null,
    };
  }
}
