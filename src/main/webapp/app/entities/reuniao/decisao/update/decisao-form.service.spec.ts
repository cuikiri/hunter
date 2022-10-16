import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../decisao.test-samples';

import { DecisaoFormService } from './decisao-form.service';

describe('Decisao Form Service', () => {
  let service: DecisaoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecisaoFormService);
  });

  describe('Service methods', () => {
    describe('createDecisaoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDecisaoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            obs: expect.any(Object),
            reuniao: expect.any(Object),
          })
        );
      });

      it('passing IDecisao should create a new form with FormGroup', () => {
        const formGroup = service.createDecisaoFormGroup(sampleWithRequiredData);

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

    describe('getDecisao', () => {
      it('should return NewDecisao for default Decisao initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDecisaoFormGroup(sampleWithNewData);

        const decisao = service.getDecisao(formGroup) as any;

        expect(decisao).toMatchObject(sampleWithNewData);
      });

      it('should return NewDecisao for empty Decisao initial value', () => {
        const formGroup = service.createDecisaoFormGroup();

        const decisao = service.getDecisao(formGroup) as any;

        expect(decisao).toMatchObject({});
      });

      it('should return IDecisao', () => {
        const formGroup = service.createDecisaoFormGroup(sampleWithRequiredData);

        const decisao = service.getDecisao(formGroup) as any;

        expect(decisao).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDecisao should not enable id FormControl', () => {
        const formGroup = service.createDecisaoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDecisao should disable id FormControl', () => {
        const formGroup = service.createDecisaoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
