import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tipo-mensagem.test-samples';

import { TipoMensagemFormService } from './tipo-mensagem-form.service';

describe('TipoMensagem Form Service', () => {
  let service: TipoMensagemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoMensagemFormService);
  });

  describe('Service methods', () => {
    describe('createTipoMensagemFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoMensagemFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nome: expect.any(Object),
            descricao: expect.any(Object),
          })
        );
      });

      it('passing ITipoMensagem should create a new form with FormGroup', () => {
        const formGroup = service.createTipoMensagemFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nome: expect.any(Object),
            descricao: expect.any(Object),
          })
        );
      });
    });

    describe('getTipoMensagem', () => {
      it('should return NewTipoMensagem for default TipoMensagem initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTipoMensagemFormGroup(sampleWithNewData);

        const tipoMensagem = service.getTipoMensagem(formGroup) as any;

        expect(tipoMensagem).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoMensagem for empty TipoMensagem initial value', () => {
        const formGroup = service.createTipoMensagemFormGroup();

        const tipoMensagem = service.getTipoMensagem(formGroup) as any;

        expect(tipoMensagem).toMatchObject({});
      });

      it('should return ITipoMensagem', () => {
        const formGroup = service.createTipoMensagemFormGroup(sampleWithRequiredData);

        const tipoMensagem = service.getTipoMensagem(formGroup) as any;

        expect(tipoMensagem).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoMensagem should not enable id FormControl', () => {
        const formGroup = service.createTipoMensagemFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoMensagem should disable id FormControl', () => {
        const formGroup = service.createTipoMensagemFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
