import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFotoSaidaEstoque, NewFotoSaidaEstoque } from '../foto-saida-estoque.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFotoSaidaEstoque for edit and NewFotoSaidaEstoqueFormGroupInput for create.
 */
type FotoSaidaEstoqueFormGroupInput = IFotoSaidaEstoque | PartialWithRequiredKeyOf<NewFotoSaidaEstoque>;

type FotoSaidaEstoqueFormDefaults = Pick<NewFotoSaidaEstoque, 'id'>;

type FotoSaidaEstoqueFormGroupContent = {
  id: FormControl<IFotoSaidaEstoque['id'] | NewFotoSaidaEstoque['id']>;
  conteudo: FormControl<IFotoSaidaEstoque['conteudo']>;
  conteudoContentType: FormControl<IFotoSaidaEstoque['conteudoContentType']>;
  saidaEstoque: FormControl<IFotoSaidaEstoque['saidaEstoque']>;
};

export type FotoSaidaEstoqueFormGroup = FormGroup<FotoSaidaEstoqueFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FotoSaidaEstoqueFormService {
  createFotoSaidaEstoqueFormGroup(fotoSaidaEstoque: FotoSaidaEstoqueFormGroupInput = { id: null }): FotoSaidaEstoqueFormGroup {
    const fotoSaidaEstoqueRawValue = {
      ...this.getFormDefaults(),
      ...fotoSaidaEstoque,
    };
    return new FormGroup<FotoSaidaEstoqueFormGroupContent>({
      id: new FormControl(
        { value: fotoSaidaEstoqueRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      conteudo: new FormControl(fotoSaidaEstoqueRawValue.conteudo, {
        validators: [Validators.required],
      }),
      conteudoContentType: new FormControl(fotoSaidaEstoqueRawValue.conteudoContentType),
      saidaEstoque: new FormControl(fotoSaidaEstoqueRawValue.saidaEstoque),
    });
  }

  getFotoSaidaEstoque(form: FotoSaidaEstoqueFormGroup): IFotoSaidaEstoque | NewFotoSaidaEstoque {
    return form.getRawValue() as IFotoSaidaEstoque | NewFotoSaidaEstoque;
  }

  resetForm(form: FotoSaidaEstoqueFormGroup, fotoSaidaEstoque: FotoSaidaEstoqueFormGroupInput): void {
    const fotoSaidaEstoqueRawValue = { ...this.getFormDefaults(), ...fotoSaidaEstoque };
    form.reset(
      {
        ...fotoSaidaEstoqueRawValue,
        id: { value: fotoSaidaEstoqueRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FotoSaidaEstoqueFormDefaults {
    return {
      id: null,
    };
  }
}
