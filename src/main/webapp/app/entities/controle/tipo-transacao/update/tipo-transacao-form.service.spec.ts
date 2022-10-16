import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tipo-transacao.test-samples';

import { TipoTransacaoFormService } from './tipo-transacao-form.service';

describe('TipoTransacao Form Service', () => {
  let service: TipoTransacaoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoTransacaoFormService);
  });

  describe('Service methods', () => {
    describe('createTipoTransacaoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoTransacaoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
          })
        );
      });

      it('passing ITipoTransacao should create a new form with FormGroup', () => {
        const formGroup = service.createTipoTransacaoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
          })
        );
      });
    });

    describe('getTipoTransacao', () => {
      it('should return NewTipoTransacao for default TipoTransacao initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTipoTransacaoFormGroup(sampleWithNewData);

        const tipoTransacao = service.getTipoTransacao(formGroup) as any;

        expect(tipoTransacao).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoTransacao for empty TipoTransacao initial value', () => {
        const formGroup = service.createTipoTransacaoFormGroup();

        const tipoTransacao = service.getTipoTransacao(formGroup) as any;

        expect(tipoTransacao).toMatchObject({});
      });

      it('should return ITipoTransacao', () => {
        const formGroup = service.createTipoTransacaoFormGroup(sampleWithRequiredData);

        const tipoTransacao = service.getTipoTransacao(formGroup) as any;

        expect(tipoTransacao).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoTransacao should not enable id FormControl', () => {
        const formGroup = service.createTipoTransacaoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoTransacao should disable id FormControl', () => {
        const formGroup = service.createTipoTransacaoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
