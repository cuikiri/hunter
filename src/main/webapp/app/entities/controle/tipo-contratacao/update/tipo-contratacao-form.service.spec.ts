import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tipo-contratacao.test-samples';

import { TipoContratacaoFormService } from './tipo-contratacao-form.service';

describe('TipoContratacao Form Service', () => {
  let service: TipoContratacaoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoContratacaoFormService);
  });

  describe('Service methods', () => {
    describe('createTipoContratacaoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoContratacaoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            colaborador: expect.any(Object),
          })
        );
      });

      it('passing ITipoContratacao should create a new form with FormGroup', () => {
        const formGroup = service.createTipoContratacaoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            colaborador: expect.any(Object),
          })
        );
      });
    });

    describe('getTipoContratacao', () => {
      it('should return NewTipoContratacao for default TipoContratacao initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTipoContratacaoFormGroup(sampleWithNewData);

        const tipoContratacao = service.getTipoContratacao(formGroup) as any;

        expect(tipoContratacao).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoContratacao for empty TipoContratacao initial value', () => {
        const formGroup = service.createTipoContratacaoFormGroup();

        const tipoContratacao = service.getTipoContratacao(formGroup) as any;

        expect(tipoContratacao).toMatchObject({});
      });

      it('should return ITipoContratacao', () => {
        const formGroup = service.createTipoContratacaoFormGroup(sampleWithRequiredData);

        const tipoContratacao = service.getTipoContratacao(formGroup) as any;

        expect(tipoContratacao).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoContratacao should not enable id FormControl', () => {
        const formGroup = service.createTipoContratacaoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoContratacao should disable id FormControl', () => {
        const formGroup = service.createTipoContratacaoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
