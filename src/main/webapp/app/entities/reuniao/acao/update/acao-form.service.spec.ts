import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../acao.test-samples';

import { AcaoFormService } from './acao-form.service';

describe('Acao Form Service', () => {
  let service: AcaoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcaoFormService);
  });

  describe('Service methods', () => {
    describe('createAcaoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAcaoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            obs: expect.any(Object),
            reuniao: expect.any(Object),
          })
        );
      });

      it('passing IAcao should create a new form with FormGroup', () => {
        const formGroup = service.createAcaoFormGroup(sampleWithRequiredData);

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

    describe('getAcao', () => {
      it('should return NewAcao for default Acao initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAcaoFormGroup(sampleWithNewData);

        const acao = service.getAcao(formGroup) as any;

        expect(acao).toMatchObject(sampleWithNewData);
      });

      it('should return NewAcao for empty Acao initial value', () => {
        const formGroup = service.createAcaoFormGroup();

        const acao = service.getAcao(formGroup) as any;

        expect(acao).toMatchObject({});
      });

      it('should return IAcao', () => {
        const formGroup = service.createAcaoFormGroup(sampleWithRequiredData);

        const acao = service.getAcao(formGroup) as any;

        expect(acao).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAcao should not enable id FormControl', () => {
        const formGroup = service.createAcaoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAcao should disable id FormControl', () => {
        const formGroup = service.createAcaoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
