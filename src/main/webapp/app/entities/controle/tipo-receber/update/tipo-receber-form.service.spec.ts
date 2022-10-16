import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tipo-receber.test-samples';

import { TipoReceberFormService } from './tipo-receber-form.service';

describe('TipoReceber Form Service', () => {
  let service: TipoReceberFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoReceberFormService);
  });

  describe('Service methods', () => {
    describe('createTipoReceberFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoReceberFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
          })
        );
      });

      it('passing ITipoReceber should create a new form with FormGroup', () => {
        const formGroup = service.createTipoReceberFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
          })
        );
      });
    });

    describe('getTipoReceber', () => {
      it('should return NewTipoReceber for default TipoReceber initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTipoReceberFormGroup(sampleWithNewData);

        const tipoReceber = service.getTipoReceber(formGroup) as any;

        expect(tipoReceber).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoReceber for empty TipoReceber initial value', () => {
        const formGroup = service.createTipoReceberFormGroup();

        const tipoReceber = service.getTipoReceber(formGroup) as any;

        expect(tipoReceber).toMatchObject({});
      });

      it('should return ITipoReceber', () => {
        const formGroup = service.createTipoReceberFormGroup(sampleWithRequiredData);

        const tipoReceber = service.getTipoReceber(formGroup) as any;

        expect(tipoReceber).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoReceber should not enable id FormControl', () => {
        const formGroup = service.createTipoReceberFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoReceber should disable id FormControl', () => {
        const formGroup = service.createTipoReceberFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
