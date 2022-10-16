import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFotoDocumento, NewFotoDocumento } from '../foto-documento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFotoDocumento for edit and NewFotoDocumentoFormGroupInput for create.
 */
type FotoDocumentoFormGroupInput = IFotoDocumento | PartialWithRequiredKeyOf<NewFotoDocumento>;

type FotoDocumentoFormDefaults = Pick<NewFotoDocumento, 'id'>;

type FotoDocumentoFormGroupContent = {
  id: FormControl<IFotoDocumento['id'] | NewFotoDocumento['id']>;
  conteudo: FormControl<IFotoDocumento['conteudo']>;
  conteudoContentType: FormControl<IFotoDocumento['conteudoContentType']>;
  documento: FormControl<IFotoDocumento['documento']>;
};

export type FotoDocumentoFormGroup = FormGroup<FotoDocumentoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FotoDocumentoFormService {
  createFotoDocumentoFormGroup(fotoDocumento: FotoDocumentoFormGroupInput = { id: null }): FotoDocumentoFormGroup {
    const fotoDocumentoRawValue = {
      ...this.getFormDefaults(),
      ...fotoDocumento,
    };
    return new FormGroup<FotoDocumentoFormGroupContent>({
      id: new FormControl(
        { value: fotoDocumentoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      conteudo: new FormControl(fotoDocumentoRawValue.conteudo, {
        validators: [Validators.required],
      }),
      conteudoContentType: new FormControl(fotoDocumentoRawValue.conteudoContentType),
      documento: new FormControl(fotoDocumentoRawValue.documento),
    });
  }

  getFotoDocumento(form: FotoDocumentoFormGroup): IFotoDocumento | NewFotoDocumento {
    return form.getRawValue() as IFotoDocumento | NewFotoDocumento;
  }

  resetForm(form: FotoDocumentoFormGroup, fotoDocumento: FotoDocumentoFormGroupInput): void {
    const fotoDocumentoRawValue = { ...this.getFormDefaults(), ...fotoDocumento };
    form.reset(
      {
        ...fotoDocumentoRawValue,
        id: { value: fotoDocumentoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FotoDocumentoFormDefaults {
    return {
      id: null,
    };
  }
}
