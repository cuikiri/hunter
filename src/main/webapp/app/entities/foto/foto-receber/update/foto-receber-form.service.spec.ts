import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../foto-receber.test-samples';

import { FotoReceberFormService } from './foto-receber-form.service';

describe('FotoReceber Form Service', () => {
  let service: FotoReceberFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoReceberFormService);
  });

  describe('Service methods', () => {
    describe('createFotoReceberFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFotoReceberFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
            receber: expect.any(Object),
          })
        );
      });

      it('passing IFotoReceber should create a new form with FormGroup', () => {
        const formGroup = service.createFotoReceberFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
            receber: expect.any(Object),
          })
        );
      });
    });

    describe('getFotoReceber', () => {
      it('should return NewFotoReceber for default FotoReceber initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFotoReceberFormGroup(sampleWithNewData);

        const fotoReceber = service.getFotoReceber(formGroup) as any;

        expect(fotoReceber).toMatchObject(sampleWithNewData);
      });

      it('should return NewFotoReceber for empty FotoReceber initial value', () => {
        const formGroup = service.createFotoReceberFormGroup();

        const fotoReceber = service.getFotoReceber(formGroup) as any;

        expect(fotoReceber).toMatchObject({});
      });

      it('should return IFotoReceber', () => {
        const formGroup = service.createFotoReceberFormGroup(sampleWithRequiredData);

        const fotoReceber = service.getFotoReceber(formGroup) as any;

        expect(fotoReceber).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFotoReceber should not enable id FormControl', () => {
        const formGroup = service.createFotoReceberFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFotoReceber should disable id FormControl', () => {
        const formGroup = service.createFotoReceberFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
