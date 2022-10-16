import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEndereco, NewEndereco } from '../endereco.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEndereco for edit and NewEnderecoFormGroupInput for create.
 */
type EnderecoFormGroupInput = IEndereco | PartialWithRequiredKeyOf<NewEndereco>;

type EnderecoFormDefaults = Pick<NewEndereco, 'id'>;

type EnderecoFormGroupContent = {
  id: FormControl<IEndereco['id'] | NewEndereco['id']>;
  cep: FormControl<IEndereco['cep']>;
  logradouro: FormControl<IEndereco['logradouro']>;
  complemento1: FormControl<IEndereco['complemento1']>;
  complemento2: FormControl<IEndereco['complemento2']>;
  numero: FormControl<IEndereco['numero']>;
  bairro: FormControl<IEndereco['bairro']>;
  localidade: FormControl<IEndereco['localidade']>;
  uf: FormControl<IEndereco['uf']>;
  unidade: FormControl<IEndereco['unidade']>;
  ibge: FormControl<IEndereco['ibge']>;
  gia: FormControl<IEndereco['gia']>;
  latitude: FormControl<IEndereco['latitude']>;
  longitude: FormControl<IEndereco['longitude']>;
  dadosPessoais: FormControl<IEndereco['dadosPessoais']>;
};

export type EnderecoFormGroup = FormGroup<EnderecoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EnderecoFormService {
  createEnderecoFormGroup(endereco: EnderecoFormGroupInput = { id: null }): EnderecoFormGroup {
    const enderecoRawValue = {
      ...this.getFormDefaults(),
      ...endereco,
    };
    return new FormGroup<EnderecoFormGroupContent>({
      id: new FormControl(
        { value: enderecoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cep: new FormControl(enderecoRawValue.cep, {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(10)],
      }),
      logradouro: new FormControl(enderecoRawValue.logradouro, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
      }),
      complemento1: new FormControl(enderecoRawValue.complemento1, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
      }),
      complemento2: new FormControl(enderecoRawValue.complemento2, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
      }),
      numero: new FormControl(enderecoRawValue.numero, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(10)],
      }),
      bairro: new FormControl(enderecoRawValue.bairro, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
      }),
      localidade: new FormControl(enderecoRawValue.localidade, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
      }),
      uf: new FormControl(enderecoRawValue.uf, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
      }),
      unidade: new FormControl(enderecoRawValue.unidade, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(20)],
      }),
      ibge: new FormControl(enderecoRawValue.ibge, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(20)],
      }),
      gia: new FormControl(enderecoRawValue.gia, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(20)],
      }),
      latitude: new FormControl(enderecoRawValue.latitude, {
        validators: [Validators.required],
      }),
      longitude: new FormControl(enderecoRawValue.longitude, {
        validators: [Validators.required],
      }),
      dadosPessoais: new FormControl(enderecoRawValue.dadosPessoais),
    });
  }

  getEndereco(form: EnderecoFormGroup): IEndereco | NewEndereco {
    return form.getRawValue() as IEndereco | NewEndereco;
  }

  resetForm(form: EnderecoFormGroup, endereco: EnderecoFormGroupInput): void {
    const enderecoRawValue = { ...this.getFormDefaults(), ...endereco };
    form.reset(
      {
        ...enderecoRawValue,
        id: { value: enderecoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EnderecoFormDefaults {
    return {
      id: null,
    };
  }
}
