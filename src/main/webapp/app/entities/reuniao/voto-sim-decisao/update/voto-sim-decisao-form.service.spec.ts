import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../voto-sim-decisao.test-samples';

import { VotoSimDecisaoFormService } from './voto-sim-decisao-form.service';

describe('VotoSimDecisao Form Service', () => {
  let service: VotoSimDecisaoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VotoSimDecisaoFormService);
  });

  describe('Service methods', () => {
    describe('createVotoSimDecisaoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createVotoSimDecisaoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            obs: expect.any(Object),
            decisao: expect.any(Object),
          })
        );
      });

      it('passing IVotoSimDecisao should create a new form with FormGroup', () => {
        const formGroup = service.createVotoSimDecisaoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            obs: expect.any(Object),
            decisao: expect.any(Object),
          })
        );
      });
    });

    describe('getVotoSimDecisao', () => {
      it('should return NewVotoSimDecisao for default VotoSimDecisao initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createVotoSimDecisaoFormGroup(sampleWithNewData);

        const votoSimDecisao = service.getVotoSimDecisao(formGroup) as any;

        expect(votoSimDecisao).toMatchObject(sampleWithNewData);
      });

      it('should return NewVotoSimDecisao for empty VotoSimDecisao initial value', () => {
        const formGroup = service.createVotoSimDecisaoFormGroup();

        const votoSimDecisao = service.getVotoSimDecisao(formGroup) as any;

        expect(votoSimDecisao).toMatchObject({});
      });

      it('should return IVotoSimDecisao', () => {
        const formGroup = service.createVotoSimDecisaoFormGroup(sampleWithRequiredData);

        const votoSimDecisao = service.getVotoSimDecisao(formGroup) as any;

        expect(votoSimDecisao).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IVotoSimDecisao should not enable id FormControl', () => {
        const formGroup = service.createVotoSimDecisaoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewVotoSimDecisao should disable id FormControl', () => {
        const formGroup = service.createVotoSimDecisaoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
