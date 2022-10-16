import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPagar, NewPagar } from '../pagar.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPagar for edit and NewPagarFormGroupInput for create.
 */
type PagarFormGroupInput = IPagar | PartialWithRequiredKeyOf<NewPagar>;

type PagarFormDefaults = Pick<NewPagar, 'id'>;

type PagarFormGroupContent = {
  id: FormControl<IPagar['id'] | NewPagar['id']>;
  data: FormControl<IPagar['data']>;
  valor: FormControl<IPagar['valor']>;
  status: FormControl<IPagar['status']>;
  obs: FormControl<IPagar['obs']>;
  tipoPagar: FormControl<IPagar['tipoPagar']>;
  pagarPara: FormControl<IPagar['pagarPara']>;
  tipoTransacao: FormControl<IPagar['tipoTransacao']>;
  dadosPessoais: FormControl<IPagar['dadosPessoais']>;
};

export type PagarFormGroup = FormGroup<PagarFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PagarFormService {
  createPagarFormGroup(pagar: PagarFormGroupInput = { id: null }): PagarFormGroup {
    const pagarRawValue = {
      ...this.getFormDefaults(),
      ...pagar,
    };
    return new FormGroup<PagarFormGroupContent>({
      id: new FormControl(
        { value: pagarRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      data: new FormControl(pagarRawValue.data, {
        validators: [Validators.required],
      }),
      valor: new FormControl(pagarRawValue.valor, {
        validators: [Validators.required],
      }),
      status: new FormControl(pagarRawValue.status),
      obs: new FormControl(pagarRawValue.obs, {
        validators: [Validators.maxLength(100)],
      }),
      tipoPagar: new FormControl(pagarRawValue.tipoPagar),
      pagarPara: new FormControl(pagarRawValue.pagarPara),
      tipoTransacao: new FormControl(pagarRawValue.tipoTransacao),
      dadosPessoais: new FormControl(pagarRawValue.dadosPessoais),
    });
  }

  getPagar(form: PagarFormGroup): IPagar | NewPagar {
    return form.getRawValue() as IPagar | NewPagar;
  }

  resetForm(form: PagarFormGroup, pagar: PagarFormGroupInput): void {
    const pagarRawValue = { ...this.getFormDefaults(), ...pagar };
    form.reset(
      {
        ...pagarRawValue,
        id: { value: pagarRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PagarFormDefaults {
    return {
      id: null,
    };
  }
}
