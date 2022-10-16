import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../aviso.test-samples';

import { AvisoFormService } from './aviso-form.service';

describe('Aviso Form Service', () => {
  let service: AvisoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvisoFormService);
  });

  describe('Service methods', () => {
    describe('createAvisoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAvisoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            data: expect.any(Object),
            titulo: expect.any(Object),
            conteudo: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });

      it('passing IAviso should create a new form with FormGroup', () => {
        const formGroup = service.createAvisoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            data: expect.any(Object),
            titulo: expect.any(Object),
            conteudo: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });
    });

    describe('getAviso', () => {
      it('should return NewAviso for default Aviso initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAvisoFormGroup(sampleWithNewData);

        const aviso = service.getAviso(formGroup) as any;

        expect(aviso).toMatchObject(sampleWithNewData);
      });

      it('should return NewAviso for empty Aviso initial value', () => {
        const formGroup = service.createAvisoFormGroup();

        const aviso = service.getAviso(formGroup) as any;

        expect(aviso).toMatchObject({});
      });

      it('should return IAviso', () => {
        const formGroup = service.createAvisoFormGroup(sampleWithRequiredData);

        const aviso = service.getAviso(formGroup) as any;

        expect(aviso).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAviso should not enable id FormControl', () => {
        const formGroup = service.createAvisoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAviso should disable id FormControl', () => {
        const formGroup = service.createAvisoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
