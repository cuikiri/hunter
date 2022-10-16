import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../raca.test-samples';

import { RacaFormService } from './raca-form.service';

describe('Raca Form Service', () => {
  let service: RacaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RacaFormService);
  });

  describe('Service methods', () => {
    describe('createRacaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRacaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            descricao: expect.any(Object),
          })
        );
      });

      it('passing IRaca should create a new form with FormGroup', () => {
        const formGroup = service.createRacaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            descricao: expect.any(Object),
          })
        );
      });
    });

    describe('getRaca', () => {
      it('should return NewRaca for default Raca initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createRacaFormGroup(sampleWithNewData);

        const raca = service.getRaca(formGroup) as any;

        expect(raca).toMatchObject(sampleWithNewData);
      });

      it('should return NewRaca for empty Raca initial value', () => {
        const formGroup = service.createRacaFormGroup();

        const raca = service.getRaca(formGroup) as any;

        expect(raca).toMatchObject({});
      });

      it('should return IRaca', () => {
        const formGroup = service.createRacaFormGroup(sampleWithRequiredData);

        const raca = service.getRaca(formGroup) as any;

        expect(raca).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRaca should not enable id FormControl', () => {
        const formGroup = service.createRacaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRaca should disable id FormControl', () => {
        const formGroup = service.createRacaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
