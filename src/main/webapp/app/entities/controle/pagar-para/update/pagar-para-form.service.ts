import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPagarPara, NewPagarPara } from '../pagar-para.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPagarPara for edit and NewPagarParaFormGroupInput for create.
 */
type PagarParaFormGroupInput = IPagarPara | PartialWithRequiredKeyOf<NewPagarPara>;

type PagarParaFormDefaults = Pick<NewPagarPara, 'id' | 'cnpj'>;

type PagarParaFormGroupContent = {
  id: FormControl<IPagarPara['id'] | NewPagarPara['id']>;
  nome: FormControl<IPagarPara['nome']>;
  descricao: FormControl<IPagarPara['descricao']>;
  cnpj: FormControl<IPagarPara['cnpj']>;
  documento: FormControl<IPagarPara['documento']>;
  banco: FormControl<IPagarPara['banco']>;
  agencia: FormControl<IPagarPara['agencia']>;
  conta: FormControl<IPagarPara['conta']>;
  pix: FormControl<IPagarPara['pix']>;
};

export type PagarParaFormGroup = FormGroup<PagarParaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PagarParaFormService {
  createPagarParaFormGroup(pagarPara: PagarParaFormGroupInput = { id: null }): PagarParaFormGroup {
    const pagarParaRawValue = {
      ...this.getFormDefaults(),
      ...pagarPara,
    };
    return new FormGroup<PagarParaFormGroupContent>({
      id: new FormControl(
        { value: pagarParaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(pagarParaRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      descricao: new FormControl(pagarParaRawValue.descricao, {
        validators: [Validators.maxLength(100)],
      }),
      cnpj: new FormControl(pagarParaRawValue.cnpj),
      documento: new FormControl(pagarParaRawValue.documento, {
        validators: [Validators.maxLength(20)],
      }),
      banco: new FormControl(pagarParaRawValue.banco, {
        validators: [Validators.maxLength(50)],
      }),
      agencia: new FormControl(pagarParaRawValue.agencia, {
        validators: [Validators.maxLength(20)],
      }),
      conta: new FormControl(pagarParaRawValue.conta, {
        validators: [Validators.maxLength(20)],
      }),
      pix: new FormControl(pagarParaRawValue.pix, {
        validators: [Validators.maxLength(50)],
      }),
    });
  }

  getPagarPara(form: PagarParaFormGroup): IPagarPara | NewPagarPara {
    return form.getRawValue() as IPagarPara | NewPagarPara;
  }

  resetForm(form: PagarParaFormGroup, pagarPara: PagarParaFormGroupInput): void {
    const pagarParaRawValue = { ...this.getFormDefaults(), ...pagarPara };
    form.reset(
      {
        ...pagarParaRawValue,
        id: { value: pagarParaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PagarParaFormDefaults {
    return {
      id: null,
      cnpj: false,
    };
  }
}
