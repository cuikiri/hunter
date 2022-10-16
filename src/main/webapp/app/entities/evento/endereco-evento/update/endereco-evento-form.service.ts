import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEnderecoEvento, NewEnderecoEvento } from '../endereco-evento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEnderecoEvento for edit and NewEnderecoEventoFormGroupInput for create.
 */
type EnderecoEventoFormGroupInput = IEnderecoEvento | PartialWithRequiredKeyOf<NewEnderecoEvento>;

type EnderecoEventoFormDefaults = Pick<NewEnderecoEvento, 'id'>;

type EnderecoEventoFormGroupContent = {
  id: FormControl<IEnderecoEvento['id'] | NewEnderecoEvento['id']>;
  cep: FormControl<IEnderecoEvento['cep']>;
  logradouro: FormControl<IEnderecoEvento['logradouro']>;
  complemento: FormControl<IEnderecoEvento['complemento']>;
  numero: FormControl<IEnderecoEvento['numero']>;
  bairro: FormControl<IEnderecoEvento['bairro']>;
  cidade: FormControl<IEnderecoEvento['cidade']>;
  uf: FormControl<IEnderecoEvento['uf']>;
  evento: FormControl<IEnderecoEvento['evento']>;
};

export type EnderecoEventoFormGroup = FormGroup<EnderecoEventoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EnderecoEventoFormService {
  createEnderecoEventoFormGroup(enderecoEvento: EnderecoEventoFormGroupInput = { id: null }): EnderecoEventoFormGroup {
    const enderecoEventoRawValue = {
      ...this.getFormDefaults(),
      ...enderecoEvento,
    };
    return new FormGroup<EnderecoEventoFormGroupContent>({
      id: new FormControl(
        { value: enderecoEventoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cep: new FormControl(enderecoEventoRawValue.cep, {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(10)],
      }),
      logradouro: new FormControl(enderecoEventoRawValue.logradouro, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      complemento: new FormControl(enderecoEventoRawValue.complemento, {
        validators: [Validators.maxLength(50)],
      }),
      numero: new FormControl(enderecoEventoRawValue.numero, {
        validators: [Validators.required, Validators.maxLength(10)],
      }),
      bairro: new FormControl(enderecoEventoRawValue.bairro, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      cidade: new FormControl(enderecoEventoRawValue.cidade, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      uf: new FormControl(enderecoEventoRawValue.uf, {
        validators: [Validators.required, Validators.maxLength(2)],
      }),
      evento: new FormControl(enderecoEventoRawValue.evento),
    });
  }

  getEnderecoEvento(form: EnderecoEventoFormGroup): IEnderecoEvento | NewEnderecoEvento {
    return form.getRawValue() as IEnderecoEvento | NewEnderecoEvento;
  }

  resetForm(form: EnderecoEventoFormGroup, enderecoEvento: EnderecoEventoFormGroupInput): void {
    const enderecoEventoRawValue = { ...this.getFormDefaults(), ...enderecoEvento };
    form.reset(
      {
        ...enderecoEventoRawValue,
        id: { value: enderecoEventoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EnderecoEventoFormDefaults {
    return {
      id: null,
    };
  }
}
