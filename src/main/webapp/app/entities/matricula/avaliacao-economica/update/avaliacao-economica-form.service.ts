import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAvaliacaoEconomica, NewAvaliacaoEconomica } from '../avaliacao-economica.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAvaliacaoEconomica for edit and NewAvaliacaoEconomicaFormGroupInput for create.
 */
type AvaliacaoEconomicaFormGroupInput = IAvaliacaoEconomica | PartialWithRequiredKeyOf<NewAvaliacaoEconomica>;

type AvaliacaoEconomicaFormDefaults = Pick<NewAvaliacaoEconomica, 'id'>;

type AvaliacaoEconomicaFormGroupContent = {
  id: FormControl<IAvaliacaoEconomica['id'] | NewAvaliacaoEconomica['id']>;
  trabalhoOuEstagio: FormControl<IAvaliacaoEconomica['trabalhoOuEstagio']>;
  vinculoEmpregaticio: FormControl<IAvaliacaoEconomica['vinculoEmpregaticio']>;
  cargoFuncao: FormControl<IAvaliacaoEconomica['cargoFuncao']>;
  contribuiRendaFamiliar: FormControl<IAvaliacaoEconomica['contribuiRendaFamiliar']>;
  apoioFinanceiroFamiliar: FormControl<IAvaliacaoEconomica['apoioFinanceiroFamiliar']>;
  estudaAtualmente: FormControl<IAvaliacaoEconomica['estudaAtualmente']>;
  escolaAtual: FormControl<IAvaliacaoEconomica['escolaAtual']>;
  estudouAnteriormente: FormControl<IAvaliacaoEconomica['estudouAnteriormente']>;
  escolaAnterior: FormControl<IAvaliacaoEconomica['escolaAnterior']>;
  concluiAnoEscolarAnterior: FormControl<IAvaliacaoEconomica['concluiAnoEscolarAnterior']>;
  repetente: FormControl<IAvaliacaoEconomica['repetente']>;
  dificuldadeAprendizado: FormControl<IAvaliacaoEconomica['dificuldadeAprendizado']>;
  dificuldadeDisciplina: FormControl<IAvaliacaoEconomica['dificuldadeDisciplina']>;
  moraCom: FormControl<IAvaliacaoEconomica['moraCom']>;
  pais: FormControl<IAvaliacaoEconomica['pais']>;
  situacaoMoradia: FormControl<IAvaliacaoEconomica['situacaoMoradia']>;
  tipoMoradia: FormControl<IAvaliacaoEconomica['tipoMoradia']>;
  recebeBeneficioGoverno: FormControl<IAvaliacaoEconomica['recebeBeneficioGoverno']>;
  tipoBeneficio: FormControl<IAvaliacaoEconomica['tipoBeneficio']>;
  familiaExiste: FormControl<IAvaliacaoEconomica['familiaExiste']>;
  assitenciaMedica: FormControl<IAvaliacaoEconomica['assitenciaMedica']>;
  temAlergia: FormControl<IAvaliacaoEconomica['temAlergia']>;
  temProblemaSaude: FormControl<IAvaliacaoEconomica['temProblemaSaude']>;
  tomaMedicamento: FormControl<IAvaliacaoEconomica['tomaMedicamento']>;
  teveFratura: FormControl<IAvaliacaoEconomica['teveFratura']>;
  teveCirurgia: FormControl<IAvaliacaoEconomica['teveCirurgia']>;
  temDeficiencia: FormControl<IAvaliacaoEconomica['temDeficiencia']>;
  temAcompanhamentoMedico: FormControl<IAvaliacaoEconomica['temAcompanhamentoMedico']>;
  dadosPessoais: FormControl<IAvaliacaoEconomica['dadosPessoais']>;
};

export type AvaliacaoEconomicaFormGroup = FormGroup<AvaliacaoEconomicaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AvaliacaoEconomicaFormService {
  createAvaliacaoEconomicaFormGroup(avaliacaoEconomica: AvaliacaoEconomicaFormGroupInput = { id: null }): AvaliacaoEconomicaFormGroup {
    const avaliacaoEconomicaRawValue = {
      ...this.getFormDefaults(),
      ...avaliacaoEconomica,
    };
    return new FormGroup<AvaliacaoEconomicaFormGroupContent>({
      id: new FormControl(
        { value: avaliacaoEconomicaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      trabalhoOuEstagio: new FormControl(avaliacaoEconomicaRawValue.trabalhoOuEstagio, {
        validators: [Validators.required],
      }),
      vinculoEmpregaticio: new FormControl(avaliacaoEconomicaRawValue.vinculoEmpregaticio),
      cargoFuncao: new FormControl(avaliacaoEconomicaRawValue.cargoFuncao, {
        validators: [Validators.maxLength(50)],
      }),
      contribuiRendaFamiliar: new FormControl(avaliacaoEconomicaRawValue.contribuiRendaFamiliar, {
        validators: [Validators.required],
      }),
      apoioFinanceiroFamiliar: new FormControl(avaliacaoEconomicaRawValue.apoioFinanceiroFamiliar, {
        validators: [Validators.required],
      }),
      estudaAtualmente: new FormControl(avaliacaoEconomicaRawValue.estudaAtualmente, {
        validators: [Validators.required],
      }),
      escolaAtual: new FormControl(avaliacaoEconomicaRawValue.escolaAtual),
      estudouAnteriormente: new FormControl(avaliacaoEconomicaRawValue.estudouAnteriormente, {
        validators: [Validators.required],
      }),
      escolaAnterior: new FormControl(avaliacaoEconomicaRawValue.escolaAnterior),
      concluiAnoEscolarAnterior: new FormControl(avaliacaoEconomicaRawValue.concluiAnoEscolarAnterior, {
        validators: [Validators.required],
      }),
      repetente: new FormControl(avaliacaoEconomicaRawValue.repetente),
      dificuldadeAprendizado: new FormControl(avaliacaoEconomicaRawValue.dificuldadeAprendizado),
      dificuldadeDisciplina: new FormControl(avaliacaoEconomicaRawValue.dificuldadeDisciplina, {
        validators: [Validators.maxLength(150)],
      }),
      moraCom: new FormControl(avaliacaoEconomicaRawValue.moraCom, {
        validators: [Validators.required],
      }),
      pais: new FormControl(avaliacaoEconomicaRawValue.pais, {
        validators: [Validators.required],
      }),
      situacaoMoradia: new FormControl(avaliacaoEconomicaRawValue.situacaoMoradia, {
        validators: [Validators.required],
      }),
      tipoMoradia: new FormControl(avaliacaoEconomicaRawValue.tipoMoradia, {
        validators: [Validators.required],
      }),
      recebeBeneficioGoverno: new FormControl(avaliacaoEconomicaRawValue.recebeBeneficioGoverno, {
        validators: [Validators.required],
      }),
      tipoBeneficio: new FormControl(avaliacaoEconomicaRawValue.tipoBeneficio, {
        validators: [Validators.maxLength(100)],
      }),
      familiaExiste: new FormControl(avaliacaoEconomicaRawValue.familiaExiste, {
        validators: [Validators.required],
      }),
      assitenciaMedica: new FormControl(avaliacaoEconomicaRawValue.assitenciaMedica, {
        validators: [Validators.required],
      }),
      temAlergia: new FormControl(avaliacaoEconomicaRawValue.temAlergia, {
        validators: [Validators.required],
      }),
      temProblemaSaude: new FormControl(avaliacaoEconomicaRawValue.temProblemaSaude, {
        validators: [Validators.required],
      }),
      tomaMedicamento: new FormControl(avaliacaoEconomicaRawValue.tomaMedicamento, {
        validators: [Validators.required],
      }),
      teveFratura: new FormControl(avaliacaoEconomicaRawValue.teveFratura, {
        validators: [Validators.required],
      }),
      teveCirurgia: new FormControl(avaliacaoEconomicaRawValue.teveCirurgia, {
        validators: [Validators.required],
      }),
      temDeficiencia: new FormControl(avaliacaoEconomicaRawValue.temDeficiencia, {
        validators: [Validators.required],
      }),
      temAcompanhamentoMedico: new FormControl(avaliacaoEconomicaRawValue.temAcompanhamentoMedico, {
        validators: [Validators.required],
      }),
      dadosPessoais: new FormControl(avaliacaoEconomicaRawValue.dadosPessoais),
    });
  }

  getAvaliacaoEconomica(form: AvaliacaoEconomicaFormGroup): IAvaliacaoEconomica | NewAvaliacaoEconomica {
    return form.getRawValue() as IAvaliacaoEconomica | NewAvaliacaoEconomica;
  }

  resetForm(form: AvaliacaoEconomicaFormGroup, avaliacaoEconomica: AvaliacaoEconomicaFormGroupInput): void {
    const avaliacaoEconomicaRawValue = { ...this.getFormDefaults(), ...avaliacaoEconomica };
    form.reset(
      {
        ...avaliacaoEconomicaRawValue,
        id: { value: avaliacaoEconomicaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AvaliacaoEconomicaFormDefaults {
    return {
      id: null,
    };
  }
}
