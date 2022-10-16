import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../colaborador.test-samples';

import { ColaboradorFormService } from './colaborador-form.service';

describe('Colaborador Form Service', () => {
  let service: ColaboradorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColaboradorFormService);
  });

  describe('Service methods', () => {
    describe('createColaboradorFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createColaboradorFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dataCadastro: expect.any(Object),
            dataAdmissao: expect.any(Object),
            dataRecisao: expect.any(Object),
            salario: expect.any(Object),
            ativo: expect.any(Object),
            obs: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });

      it('passing IColaborador should create a new form with FormGroup', () => {
        const formGroup = service.createColaboradorFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dataCadastro: expect.any(Object),
            dataAdmissao: expect.any(Object),
            dataRecisao: expect.any(Object),
            salario: expect.any(Object),
            ativo: expect.any(Object),
            obs: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });
    });

    describe('getColaborador', () => {
      it('should return NewColaborador for default Colaborador initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createColaboradorFormGroup(sampleWithNewData);

        const colaborador = service.getColaborador(formGroup) as any;

        expect(colaborador).toMatchObject(sampleWithNewData);
      });

      it('should return NewColaborador for empty Colaborador initial value', () => {
        const formGroup = service.createColaboradorFormGroup();

        const colaborador = service.getColaborador(formGroup) as any;

        expect(colaborador).toMatchObject({});
      });

      it('should return IColaborador', () => {
        const formGroup = service.createColaboradorFormGroup(sampleWithRequiredData);

        const colaborador = service.getColaborador(formGroup) as any;

        expect(colaborador).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IColaborador should not enable id FormControl', () => {
        const formGroup = service.createColaboradorFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewColaborador should disable id FormControl', () => {
        const formGroup = service.createColaboradorFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
