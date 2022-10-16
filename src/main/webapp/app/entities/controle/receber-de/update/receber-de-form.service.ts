import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IReceberDe, NewReceberDe } from '../receber-de.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReceberDe for edit and NewReceberDeFormGroupInput for create.
 */
type ReceberDeFormGroupInput = IReceberDe | PartialWithRequiredKeyOf<NewReceberDe>;

type ReceberDeFormDefaults = Pick<NewReceberDe, 'id' | 'cnpj'>;

type ReceberDeFormGroupContent = {
  id: FormControl<IReceberDe['id'] | NewReceberDe['id']>;
  nome: FormControl<IReceberDe['nome']>;
  descricao: FormControl<IReceberDe['descricao']>;
  cnpj: FormControl<IReceberDe['cnpj']>;
  documento: FormControl<IReceberDe['documento']>;
};

export type ReceberDeFormGroup = FormGroup<ReceberDeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReceberDeFormService {
  createReceberDeFormGroup(receberDe: ReceberDeFormGroupInput = { id: null }): ReceberDeFormGroup {
    const receberDeRawValue = {
      ...this.getFormDefaults(),
      ...receberDe,
    };
    return new FormGroup<ReceberDeFormGroupContent>({
      id: new FormControl(
        { value: receberDeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(receberDeRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      descricao: new FormControl(receberDeRawValue.descricao, {
        validators: [Validators.maxLength(100)],
      }),
      cnpj: new FormControl(receberDeRawValue.cnpj),
      documento: new FormControl(receberDeRawValue.documento, {
        validators: [Validators.maxLength(20)],
      }),
    });
  }

  getReceberDe(form: ReceberDeFormGroup): IReceberDe | NewReceberDe {
    return form.getRawValue() as IReceberDe | NewReceberDe;
  }

  resetForm(form: ReceberDeFormGroup, receberDe: ReceberDeFormGroupInput): void {
    const receberDeRawValue = { ...this.getFormDefaults(), ...receberDe };
    form.reset(
      {
        ...receberDeRawValue,
        id: { value: receberDeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ReceberDeFormDefaults {
    return {
      id: null,
      cnpj: false,
    };
  }
}
