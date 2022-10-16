import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../pauta.test-samples';

import { PautaFormService } from './pauta-form.service';

describe('Pauta Form Service', () => {
  let service: PautaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PautaFormService);
  });

  describe('Service methods', () => {
    describe('createPautaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPautaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            obs: expect.any(Object),
            reuniao: expect.any(Object),
          })
        );
      });

      it('passing IPauta should create a new form with FormGroup', () => {
        const formGroup = service.createPautaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            obs: expect.any(Object),
            reuniao: expect.any(Object),
          })
        );
      });
    });

    describe('getPauta', () => {
      it('should return NewPauta for default Pauta initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPautaFormGroup(sampleWithNewData);

        const pauta = service.getPauta(formGroup) as any;

        expect(pauta).toMatchObject(sampleWithNewData);
      });

      it('should return NewPauta for empty Pauta initial value', () => {
        const formGroup = service.createPautaFormGroup();

        const pauta = service.getPauta(formGroup) as any;

        expect(pauta).toMatchObject({});
      });

      it('should return IPauta', () => {
        const formGroup = service.createPautaFormGroup(sampleWithRequiredData);

        const pauta = service.getPauta(formGroup) as any;

        expect(pauta).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPauta should not enable id FormControl', () => {
        const formGroup = service.createPautaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPauta should disable id FormControl', () => {
        const formGroup = service.createPautaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
