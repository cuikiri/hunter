import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDadosPessoais, NewDadosPessoais } from '../dados-pessoais.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDadosPessoais for edit and NewDadosPessoaisFormGroupInput for create.
 */
type DadosPessoaisFormGroupInput = IDadosPessoais | PartialWithRequiredKeyOf<NewDadosPessoais>;

type DadosPessoaisFormDefaults = Pick<NewDadosPessoais, 'id'>;

type DadosPessoaisFormGroupContent = {
  id: FormControl<IDadosPessoais['id'] | NewDadosPessoais['id']>;
  nome: FormControl<IDadosPessoais['nome']>;
  sobreNome: FormControl<IDadosPessoais['sobreNome']>;
  pai: FormControl<IDadosPessoais['pai']>;
  mae: FormControl<IDadosPessoais['mae']>;
  telefone: FormControl<IDadosPessoais['telefone']>;
  celular: FormControl<IDadosPessoais['celular']>;
  whatsapp: FormControl<IDadosPessoais['whatsapp']>;
  tipoPessoa: FormControl<IDadosPessoais['tipoPessoa']>;
  estadoCivil: FormControl<IDadosPessoais['estadoCivil']>;
  raca: FormControl<IDadosPessoais['raca']>;
  religiao: FormControl<IDadosPessoais['religiao']>;
  foto: FormControl<IDadosPessoais['foto']>;
  fotoAvatar: FormControl<IDadosPessoais['fotoAvatar']>;
  fotoIcon: FormControl<IDadosPessoais['fotoIcon']>;
};

export type DadosPessoaisFormGroup = FormGroup<DadosPessoaisFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DadosPessoaisFormService {
  createDadosPessoaisFormGroup(dadosPessoais: DadosPessoaisFormGroupInput = { id: null }): DadosPessoaisFormGroup {
    const dadosPessoaisRawValue = {
      ...this.getFormDefaults(),
      ...dadosPessoais,
    };
    return new FormGroup<DadosPessoaisFormGroupContent>({
      id: new FormControl(
        { value: dadosPessoaisRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(dadosPessoaisRawValue.nome, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(20)],
      }),
      sobreNome: new FormControl(dadosPessoaisRawValue.sobreNome, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
      }),
      pai: new FormControl(dadosPessoaisRawValue.pai, {
        validators: [Validators.minLength(1), Validators.maxLength(50)],
      }),
      mae: new FormControl(dadosPessoaisRawValue.mae, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
      }),
      telefone: new FormControl(dadosPessoaisRawValue.telefone, {
        validators: [Validators.minLength(8), Validators.maxLength(20)],
      }),
      celular: new FormControl(dadosPessoaisRawValue.celular, {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
      }),
      whatsapp: new FormControl(dadosPessoaisRawValue.whatsapp, {
        validators: [Validators.minLength(8), Validators.maxLength(20)],
      }),
      tipoPessoa: new FormControl(dadosPessoaisRawValue.tipoPessoa, {
        validators: [Validators.required],
      }),
      estadoCivil: new FormControl(dadosPessoaisRawValue.estadoCivil, {
        validators: [Validators.required],
      }),
      raca: new FormControl(dadosPessoaisRawValue.raca, {
        validators: [Validators.required],
      }),
      religiao: new FormControl(dadosPessoaisRawValue.religiao, {
        validators: [Validators.required],
      }),
      foto: new FormControl(dadosPessoaisRawValue.foto),
      fotoAvatar: new FormControl(dadosPessoaisRawValue.fotoAvatar),
      fotoIcon: new FormControl(dadosPessoaisRawValue.fotoIcon),
    });
  }

  getDadosPessoais(form: DadosPessoaisFormGroup): IDadosPessoais | NewDadosPessoais {
    return form.getRawValue() as IDadosPessoais | NewDadosPessoais;
  }

  resetForm(form: DadosPessoaisFormGroup, dadosPessoais: DadosPessoaisFormGroupInput): void {
    const dadosPessoaisRawValue = { ...this.getFormDefaults(), ...dadosPessoais };
    form.reset(
      {
        ...dadosPessoaisRawValue,
        id: { value: dadosPessoaisRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DadosPessoaisFormDefaults {
    return {
      id: null,
    };
  }
}
