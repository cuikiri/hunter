import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../foto-documento.test-samples';

import { FotoDocumentoFormService } from './foto-documento-form.service';

describe('FotoDocumento Form Service', () => {
  let service: FotoDocumentoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoDocumentoFormService);
  });

  describe('Service methods', () => {
    describe('createFotoDocumentoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFotoDocumentoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
            documento: expect.any(Object),
          })
        );
      });

      it('passing IFotoDocumento should create a new form with FormGroup', () => {
        const formGroup = service.createFotoDocumentoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
            documento: expect.any(Object),
          })
        );
      });
    });

    describe('getFotoDocumento', () => {
      it('should return NewFotoDocumento for default FotoDocumento initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFotoDocumentoFormGroup(sampleWithNewData);

        const fotoDocumento = service.getFotoDocumento(formGroup) as any;

        expect(fotoDocumento).toMatchObject(sampleWithNewData);
      });

      it('should return NewFotoDocumento for empty FotoDocumento initial value', () => {
        const formGroup = service.createFotoDocumentoFormGroup();

        const fotoDocumento = service.getFotoDocumento(formGroup) as any;

        expect(fotoDocumento).toMatchObject({});
      });

      it('should return IFotoDocumento', () => {
        const formGroup = service.createFotoDocumentoFormGroup(sampleWithRequiredData);

        const fotoDocumento = service.getFotoDocumento(formGroup) as any;

        expect(fotoDocumento).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFotoDocumento should not enable id FormControl', () => {
        const formGroup = service.createFotoDocumentoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFotoDocumento should disable id FormControl', () => {
        const formGroup = service.createFotoDocumentoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
