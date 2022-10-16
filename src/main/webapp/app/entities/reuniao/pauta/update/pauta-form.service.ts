import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPauta, NewPauta } from '../pauta.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPauta for edit and NewPautaFormGroupInput for create.
 */
type PautaFormGroupInput = IPauta | PartialWithRequiredKeyOf<NewPauta>;

type PautaFormDefaults = Pick<NewPauta, 'id'>;

type PautaFormGroupContent = {
  id: FormControl<IPauta['id'] | NewPauta['id']>;
  nome: FormControl<IPauta['nome']>;
  obs: FormControl<IPauta['obs']>;
  reuniao: FormControl<IPauta['reuniao']>;
};

export type PautaFormGroup = FormGroup<PautaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PautaFormService {
  createPautaFormGroup(pauta: PautaFormGroupInput = { id: null }): PautaFormGroup {
    const pautaRawValue = {
      ...this.getFormDefaults(),
      ...pauta,
    };
    return new FormGroup<PautaFormGroupContent>({
      id: new FormControl(
        { value: pautaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(pautaRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      obs: new FormControl(pautaRawValue.obs, {
        validators: [Validators.maxLength(100)],
      }),
      reuniao: new FormControl(pautaRawValue.reuniao),
    });
  }

  getPauta(form: PautaFormGroup): IPauta | NewPauta {
    return form.getRawValue() as IPauta | NewPauta;
  }

  resetForm(form: PautaFormGroup, pauta: PautaFormGroupInput): void {
    const pautaRawValue = { ...this.getFormDefaults(), ...pauta };
    form.reset(
      {
        ...pautaRawValue,
        id: { value: pautaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PautaFormDefaults {
    return {
      id: null,
    };
  }
}
