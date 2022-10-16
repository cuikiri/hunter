import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFotoProduto, NewFotoProduto } from '../foto-produto.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFotoProduto for edit and NewFotoProdutoFormGroupInput for create.
 */
type FotoProdutoFormGroupInput = IFotoProduto | PartialWithRequiredKeyOf<NewFotoProduto>;

type FotoProdutoFormDefaults = Pick<NewFotoProduto, 'id'>;

type FotoProdutoFormGroupContent = {
  id: FormControl<IFotoProduto['id'] | NewFotoProduto['id']>;
  conteudo: FormControl<IFotoProduto['conteudo']>;
  conteudoContentType: FormControl<IFotoProduto['conteudoContentType']>;
  produto: FormControl<IFotoProduto['produto']>;
};

export type FotoProdutoFormGroup = FormGroup<FotoProdutoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FotoProdutoFormService {
  createFotoProdutoFormGroup(fotoProduto: FotoProdutoFormGroupInput = { id: null }): FotoProdutoFormGroup {
    const fotoProdutoRawValue = {
      ...this.getFormDefaults(),
      ...fotoProduto,
    };
    return new FormGroup<FotoProdutoFormGroupContent>({
      id: new FormControl(
        { value: fotoProdutoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      conteudo: new FormControl(fotoProdutoRawValue.conteudo, {
        validators: [Validators.required],
      }),
      conteudoContentType: new FormControl(fotoProdutoRawValue.conteudoContentType),
      produto: new FormControl(fotoProdutoRawValue.produto),
    });
  }

  getFotoProduto(form: FotoProdutoFormGroup): IFotoProduto | NewFotoProduto {
    return form.getRawValue() as IFotoProduto | NewFotoProduto;
  }

  resetForm(form: FotoProdutoFormGroup, fotoProduto: FotoProdutoFormGroupInput): void {
    const fotoProdutoRawValue = { ...this.getFormDefaults(), ...fotoProduto };
    form.reset(
      {
        ...fotoProdutoRawValue,
        id: { value: fotoProdutoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FotoProdutoFormDefaults {
    return {
      id: null,
    };
  }
}
