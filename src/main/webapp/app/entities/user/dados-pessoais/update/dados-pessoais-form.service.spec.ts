import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../dados-pessoais.test-samples';

import { DadosPessoaisFormService } from './dados-pessoais-form.service';

describe('DadosPessoais Form Service', () => {
  let service: DadosPessoaisFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosPessoaisFormService);
  });

  describe('Service methods', () => {
    describe('createDadosPessoaisFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDadosPessoaisFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            sobreNome: expect.any(Object),
            pai: expect.any(Object),
            mae: expect.any(Object),
            telefone: expect.any(Object),
            celular: expect.any(Object),
            whatsapp: expect.any(Object),
            email: expect.any(Object),
            tipoPessoa: expect.any(Object),
            estadoCivil: expect.any(Object),
            raca: expect.any(Object),
            religiao: expect.any(Object),
            foto: expect.any(Object),
            fotoAvatar: expect.any(Object),
            fotoIcon: expect.any(Object),
          })
        );
      });

      it('passing IDadosPessoais should create a new form with FormGroup', () => {
        const formGroup = service.createDadosPessoaisFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            sobreNome: expect.any(Object),
            pai: expect.any(Object),
            mae: expect.any(Object),
            telefone: expect.any(Object),
            celular: expect.any(Object),
            whatsapp: expect.any(Object),
            email: expect.any(Object),
            tipoPessoa: expect.any(Object),
            estadoCivil: expect.any(Object),
            raca: expect.any(Object),
            religiao: expect.any(Object),
            foto: expect.any(Object),
            fotoAvatar: expect.any(Object),
            fotoIcon: expect.any(Object),
          })
        );
      });
    });

    describe('getDadosPessoais', () => {
      it('should return NewDadosPessoais for default DadosPessoais initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDadosPessoaisFormGroup(sampleWithNewData);

        const dadosPessoais = service.getDadosPessoais(formGroup) as any;

        expect(dadosPessoais).toMatchObject(sampleWithNewData);
      });

      it('should return NewDadosPessoais for empty DadosPessoais initial value', () => {
        const formGroup = service.createDadosPessoaisFormGroup();

        const dadosPessoais = service.getDadosPessoais(formGroup) as any;

        expect(dadosPessoais).toMatchObject({});
      });

      it('should return IDadosPessoais', () => {
        const formGroup = service.createDadosPessoaisFormGroup(sampleWithRequiredData);

        const dadosPessoais = service.getDadosPessoais(formGroup) as any;

        expect(dadosPessoais).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDadosPessoais should not enable id FormControl', () => {
        const formGroup = service.createDadosPessoaisFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDadosPessoais should disable id FormControl', () => {
        const formGroup = service.createDadosPessoaisFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
