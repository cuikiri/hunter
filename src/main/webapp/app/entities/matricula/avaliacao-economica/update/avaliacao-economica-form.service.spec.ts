import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../avaliacao-economica.test-samples';

import { AvaliacaoEconomicaFormService } from './avaliacao-economica-form.service';

describe('AvaliacaoEconomica Form Service', () => {
  let service: AvaliacaoEconomicaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaliacaoEconomicaFormService);
  });

  describe('Service methods', () => {
    describe('createAvaliacaoEconomicaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAvaliacaoEconomicaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            trabalhoOuEstagio: expect.any(Object),
            vinculoEmpregaticio: expect.any(Object),
            cargoFuncao: expect.any(Object),
            contribuiRendaFamiliar: expect.any(Object),
            apoioFinanceiroFamiliar: expect.any(Object),
            estudaAtualmente: expect.any(Object),
            escolaAtual: expect.any(Object),
            estudouAnteriormente: expect.any(Object),
            escolaAnterior: expect.any(Object),
            concluiAnoEscolarAnterior: expect.any(Object),
            repetente: expect.any(Object),
            dificuldadeAprendizado: expect.any(Object),
            dificuldadeDisciplina: expect.any(Object),
            moraCom: expect.any(Object),
            pais: expect.any(Object),
            situacaoMoradia: expect.any(Object),
            tipoMoradia: expect.any(Object),
            recebeBeneficioGoverno: expect.any(Object),
            tipoBeneficio: expect.any(Object),
            familiaExiste: expect.any(Object),
            assitenciaMedica: expect.any(Object),
            temAlergia: expect.any(Object),
            temProblemaSaude: expect.any(Object),
            tomaMedicamento: expect.any(Object),
            teveFratura: expect.any(Object),
            teveCirurgia: expect.any(Object),
            temDeficiencia: expect.any(Object),
            temAcompanhamentoMedico: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });

      it('passing IAvaliacaoEconomica should create a new form with FormGroup', () => {
        const formGroup = service.createAvaliacaoEconomicaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            trabalhoOuEstagio: expect.any(Object),
            vinculoEmpregaticio: expect.any(Object),
            cargoFuncao: expect.any(Object),
            contribuiRendaFamiliar: expect.any(Object),
            apoioFinanceiroFamiliar: expect.any(Object),
            estudaAtualmente: expect.any(Object),
            escolaAtual: expect.any(Object),
            estudouAnteriormente: expect.any(Object),
            escolaAnterior: expect.any(Object),
            concluiAnoEscolarAnterior: expect.any(Object),
            repetente: expect.any(Object),
            dificuldadeAprendizado: expect.any(Object),
            dificuldadeDisciplina: expect.any(Object),
            moraCom: expect.any(Object),
            pais: expect.any(Object),
            situacaoMoradia: expect.any(Object),
            tipoMoradia: expect.any(Object),
            recebeBeneficioGoverno: expect.any(Object),
            tipoBeneficio: expect.any(Object),
            familiaExiste: expect.any(Object),
            assitenciaMedica: expect.any(Object),
            temAlergia: expect.any(Object),
            temProblemaSaude: expect.any(Object),
            tomaMedicamento: expect.any(Object),
            teveFratura: expect.any(Object),
            teveCirurgia: expect.any(Object),
            temDeficiencia: expect.any(Object),
            temAcompanhamentoMedico: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });
    });

    describe('getAvaliacaoEconomica', () => {
      it('should return NewAvaliacaoEconomica for default AvaliacaoEconomica initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAvaliacaoEconomicaFormGroup(sampleWithNewData);

        const avaliacaoEconomica = service.getAvaliacaoEconomica(formGroup) as any;

        expect(avaliacaoEconomica).toMatchObject(sampleWithNewData);
      });

      it('should return NewAvaliacaoEconomica for empty AvaliacaoEconomica initial value', () => {
        const formGroup = service.createAvaliacaoEconomicaFormGroup();

        const avaliacaoEconomica = service.getAvaliacaoEconomica(formGroup) as any;

        expect(avaliacaoEconomica).toMatchObject({});
      });

      it('should return IAvaliacaoEconomica', () => {
        const formGroup = service.createAvaliacaoEconomicaFormGroup(sampleWithRequiredData);

        const avaliacaoEconomica = service.getAvaliacaoEconomica(formGroup) as any;

        expect(avaliacaoEconomica).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAvaliacaoEconomica should not enable id FormControl', () => {
        const formGroup = service.createAvaliacaoEconomicaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAvaliacaoEconomica should disable id FormControl', () => {
        const formGroup = service.createAvaliacaoEconomicaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
