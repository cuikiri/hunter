import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../voto-nao-decisao.test-samples';

import { VotoNaoDecisaoFormService } from './voto-nao-decisao-form.service';

describe('VotoNaoDecisao Form Service', () => {
  let service: VotoNaoDecisaoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VotoNaoDecisaoFormService);
  });

  describe('Service methods', () => {
    describe('createVotoNaoDecisaoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createVotoNaoDecisaoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            obs: expect.any(Object),
            decisao: expect.any(Object),
          })
        );
      });

      it('passing IVotoNaoDecisao should create a new form with FormGroup', () => {
        const formGroup = service.createVotoNaoDecisaoFormGroup(sampleWithRequiredData);

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

    describe('getVotoNaoDecisao', () => {
      it('should return NewVotoNaoDecisao for default VotoNaoDecisao initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createVotoNaoDecisaoFormGroup(sampleWithNewData);

        const votoNaoDecisao = service.getVotoNaoDecisao(formGroup) as any;

        expect(votoNaoDecisao).toMatchObject(sampleWithNewData);
      });

      it('should return NewVotoNaoDecisao for empty VotoNaoDecisao initial value', () => {
        const formGroup = service.createVotoNaoDecisaoFormGroup();

        const votoNaoDecisao = service.getVotoNaoDecisao(formGroup) as any;

        expect(votoNaoDecisao).toMatchObject({});
      });

      it('should return IVotoNaoDecisao', () => {
        const formGroup = service.createVotoNaoDecisaoFormGroup(sampleWithRequiredData);

        const votoNaoDecisao = service.getVotoNaoDecisao(formGroup) as any;

        expect(votoNaoDecisao).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IVotoNaoDecisao should not enable id FormControl', () => {
        const formGroup = service.createVotoNaoDecisaoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewVotoNaoDecisao should disable id FormControl', () => {
        const formGroup = service.createVotoNaoDecisaoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
