import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../acompanhamento-aluno.test-samples';

import { AcompanhamentoAlunoFormService } from './acompanhamento-aluno-form.service';

describe('AcompanhamentoAluno Form Service', () => {
  let service: AcompanhamentoAlunoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcompanhamentoAlunoFormService);
  });

  describe('Service methods', () => {
    describe('createAcompanhamentoAlunoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAcompanhamentoAlunoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ano: expect.any(Object),
            ensino: expect.any(Object),
            bimestre: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });

      it('passing IAcompanhamentoAluno should create a new form with FormGroup', () => {
        const formGroup = service.createAcompanhamentoAlunoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ano: expect.any(Object),
            ensino: expect.any(Object),
            bimestre: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });
    });

    describe('getAcompanhamentoAluno', () => {
      it('should return NewAcompanhamentoAluno for default AcompanhamentoAluno initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAcompanhamentoAlunoFormGroup(sampleWithNewData);

        const acompanhamentoAluno = service.getAcompanhamentoAluno(formGroup) as any;

        expect(acompanhamentoAluno).toMatchObject(sampleWithNewData);
      });

      it('should return NewAcompanhamentoAluno for empty AcompanhamentoAluno initial value', () => {
        const formGroup = service.createAcompanhamentoAlunoFormGroup();

        const acompanhamentoAluno = service.getAcompanhamentoAluno(formGroup) as any;

        expect(acompanhamentoAluno).toMatchObject({});
      });

      it('should return IAcompanhamentoAluno', () => {
        const formGroup = service.createAcompanhamentoAlunoFormGroup(sampleWithRequiredData);

        const acompanhamentoAluno = service.getAcompanhamentoAluno(formGroup) as any;

        expect(acompanhamentoAluno).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAcompanhamentoAluno should not enable id FormControl', () => {
        const formGroup = service.createAcompanhamentoAlunoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAcompanhamentoAluno should disable id FormControl', () => {
        const formGroup = service.createAcompanhamentoAlunoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
