import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../dados-medico.test-samples';

import { DadosMedicoFormService } from './dados-medico-form.service';

describe('DadosMedico Form Service', () => {
  let service: DadosMedicoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosMedicoFormService);
  });

  describe('Service methods', () => {
    describe('createDadosMedicoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDadosMedicoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            data: expect.any(Object),
            peso: expect.any(Object),
            altura: expect.any(Object),
            pressao: expect.any(Object),
            coracao: expect.any(Object),
            medicacao: expect.any(Object),
            obs: expect.any(Object),
            vacina: expect.any(Object),
            alergia: expect.any(Object),
            doenca: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });

      it('passing IDadosMedico should create a new form with FormGroup', () => {
        const formGroup = service.createDadosMedicoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            data: expect.any(Object),
            peso: expect.any(Object),
            altura: expect.any(Object),
            pressao: expect.any(Object),
            coracao: expect.any(Object),
            medicacao: expect.any(Object),
            obs: expect.any(Object),
            vacina: expect.any(Object),
            alergia: expect.any(Object),
            doenca: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });
    });

    describe('getDadosMedico', () => {
      it('should return NewDadosMedico for default DadosMedico initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDadosMedicoFormGroup(sampleWithNewData);

        const dadosMedico = service.getDadosMedico(formGroup) as any;

        expect(dadosMedico).toMatchObject(sampleWithNewData);
      });

      it('should return NewDadosMedico for empty DadosMedico initial value', () => {
        const formGroup = service.createDadosMedicoFormGroup();

        const dadosMedico = service.getDadosMedico(formGroup) as any;

        expect(dadosMedico).toMatchObject({});
      });

      it('should return IDadosMedico', () => {
        const formGroup = service.createDadosMedicoFormGroup(sampleWithRequiredData);

        const dadosMedico = service.getDadosMedico(formGroup) as any;

        expect(dadosMedico).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDadosMedico should not enable id FormControl', () => {
        const formGroup = service.createDadosMedicoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDadosMedico should disable id FormControl', () => {
        const formGroup = service.createDadosMedicoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
