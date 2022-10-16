import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../reuniao.test-samples';

import { ReuniaoFormService } from './reuniao-form.service';

describe('Reuniao Form Service', () => {
  let service: ReuniaoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReuniaoFormService);
  });

  describe('Service methods', () => {
    describe('createReuniaoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createReuniaoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            descricao: expect.any(Object),
            data: expect.any(Object),
            dataInicio: expect.any(Object),
            dataFim: expect.any(Object),
            horaInicio: expect.any(Object),
            horaFim: expect.any(Object),
            tipoReuniao: expect.any(Object),
            obs: expect.any(Object),
          })
        );
      });

      it('passing IReuniao should create a new form with FormGroup', () => {
        const formGroup = service.createReuniaoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            descricao: expect.any(Object),
            data: expect.any(Object),
            dataInicio: expect.any(Object),
            dataFim: expect.any(Object),
            horaInicio: expect.any(Object),
            horaFim: expect.any(Object),
            tipoReuniao: expect.any(Object),
            obs: expect.any(Object),
          })
        );
      });
    });

    describe('getReuniao', () => {
      it('should return NewReuniao for default Reuniao initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createReuniaoFormGroup(sampleWithNewData);

        const reuniao = service.getReuniao(formGroup) as any;

        expect(reuniao).toMatchObject(sampleWithNewData);
      });

      it('should return NewReuniao for empty Reuniao initial value', () => {
        const formGroup = service.createReuniaoFormGroup();

        const reuniao = service.getReuniao(formGroup) as any;

        expect(reuniao).toMatchObject({});
      });

      it('should return IReuniao', () => {
        const formGroup = service.createReuniaoFormGroup(sampleWithRequiredData);

        const reuniao = service.getReuniao(formGroup) as any;

        expect(reuniao).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IReuniao should not enable id FormControl', () => {
        const formGroup = service.createReuniaoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewReuniao should disable id FormControl', () => {
        const formGroup = service.createReuniaoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
