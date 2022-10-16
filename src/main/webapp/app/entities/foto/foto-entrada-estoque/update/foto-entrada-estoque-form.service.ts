import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFotoEntradaEstoque, NewFotoEntradaEstoque } from '../foto-entrada-estoque.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFotoEntradaEstoque for edit and NewFotoEntradaEstoqueFormGroupInput for create.
 */
type FotoEntradaEstoqueFormGroupInput = IFotoEntradaEstoque | PartialWithRequiredKeyOf<NewFotoEntradaEstoque>;

type FotoEntradaEstoqueFormDefaults = Pick<NewFotoEntradaEstoque, 'id'>;

type FotoEntradaEstoqueFormGroupContent = {
  id: FormControl<IFotoEntradaEstoque['id'] | NewFotoEntradaEstoque['id']>;
  conteudo: FormControl<IFotoEntradaEstoque['conteudo']>;
  conteudoContentType: FormControl<IFotoEntradaEstoque['conteudoContentType']>;
  entradaEstoque: FormControl<IFotoEntradaEstoque['entradaEstoque']>;
};

export type FotoEntradaEstoqueFormGroup = FormGroup<FotoEntradaEstoqueFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FotoEntradaEstoqueFormService {
  createFotoEntradaEstoqueFormGroup(fotoEntradaEstoque: FotoEntradaEstoqueFormGroupInput = { id: null }): FotoEntradaEstoqueFormGroup {
    const fotoEntradaEstoqueRawValue = {
      ...this.getFormDefaults(),
      ...fotoEntradaEstoque,
    };
    return new FormGroup<FotoEntradaEstoqueFormGroupContent>({
      id: new FormControl(
        { value: fotoEntradaEstoqueRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      conteudo: new FormControl(fotoEntradaEstoqueRawValue.conteudo, {
        validators: [Validators.required],
      }),
      conteudoContentType: new FormControl(fotoEntradaEstoqueRawValue.conteudoContentType),
      entradaEstoque: new FormControl(fotoEntradaEstoqueRawValue.entradaEstoque),
    });
  }

  getFotoEntradaEstoque(form: FotoEntradaEstoqueFormGroup): IFotoEntradaEstoque | NewFotoEntradaEstoque {
    return form.getRawValue() as IFotoEntradaEstoque | NewFotoEntradaEstoque;
  }

  resetForm(form: FotoEntradaEstoqueFormGroup, fotoEntradaEstoque: FotoEntradaEstoqueFormGroupInput): void {
    const fotoEntradaEstoqueRawValue = { ...this.getFormDefaults(), ...fotoEntradaEstoque };
    form.reset(
      {
        ...fotoEntradaEstoqueRawValue,
        id: { value: fotoEntradaEstoqueRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FotoEntradaEstoqueFormDefaults {
    return {
      id: null,
    };
  }
}
