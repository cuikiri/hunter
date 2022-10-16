import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../receber.test-samples';

import { ReceberFormService } from './receber-form.service';

describe('Receber Form Service', () => {
  let service: ReceberFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceberFormService);
  });

  describe('Service methods', () => {
    describe('createReceberFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createReceberFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            data: expect.any(Object),
            valor: expect.any(Object),
            status: expect.any(Object),
            obs: expect.any(Object),
            tipoReceber: expect.any(Object),
            receberDe: expect.any(Object),
            tipoTransacao: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });

      it('passing IReceber should create a new form with FormGroup', () => {
        const formGroup = service.createReceberFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            data: expect.any(Object),
            valor: expect.any(Object),
            status: expect.any(Object),
            obs: expect.any(Object),
            tipoReceber: expect.any(Object),
            receberDe: expect.any(Object),
            tipoTransacao: expect.any(Object),
            dadosPessoais: expect.any(Object),
          })
        );
      });
    });

    describe('getReceber', () => {
      it('should return NewReceber for default Receber initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createReceberFormGroup(sampleWithNewData);

        const receber = service.getReceber(formGroup) as any;

        expect(receber).toMatchObject(sampleWithNewData);
      });

      it('should return NewReceber for empty Receber initial value', () => {
        const formGroup = service.createReceberFormGroup();

        const receber = service.getReceber(formGroup) as any;

        expect(receber).toMatchObject({});
      });

      it('should return IReceber', () => {
        const formGroup = service.createReceberFormGroup(sampleWithRequiredData);

        const receber = service.getReceber(formGroup) as any;

        expect(receber).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IReceber should not enable id FormControl', () => {
        const formGroup = service.createReceberFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewReceber should disable id FormControl', () => {
        const formGroup = service.createReceberFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
