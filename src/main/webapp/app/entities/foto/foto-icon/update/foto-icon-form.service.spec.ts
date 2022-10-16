import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../foto-icon.test-samples';

import { FotoIconFormService } from './foto-icon-form.service';

describe('FotoIcon Form Service', () => {
  let service: FotoIconFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoIconFormService);
  });

  describe('Service methods', () => {
    describe('createFotoIconFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFotoIconFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
          })
        );
      });

      it('passing IFotoIcon should create a new form with FormGroup', () => {
        const formGroup = service.createFotoIconFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
          })
        );
      });
    });

    describe('getFotoIcon', () => {
      it('should return NewFotoIcon for default FotoIcon initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFotoIconFormGroup(sampleWithNewData);

        const fotoIcon = service.getFotoIcon(formGroup) as any;

        expect(fotoIcon).toMatchObject(sampleWithNewData);
      });

      it('should return NewFotoIcon for empty FotoIcon initial value', () => {
        const formGroup = service.createFotoIconFormGroup();

        const fotoIcon = service.getFotoIcon(formGroup) as any;

        expect(fotoIcon).toMatchObject({});
      });

      it('should return IFotoIcon', () => {
        const formGroup = service.createFotoIconFormGroup(sampleWithRequiredData);

        const fotoIcon = service.getFotoIcon(formGroup) as any;

        expect(fotoIcon).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFotoIcon should not enable id FormControl', () => {
        const formGroup = service.createFotoIconFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFotoIcon should disable id FormControl', () => {
        const formGroup = service.createFotoIconFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
