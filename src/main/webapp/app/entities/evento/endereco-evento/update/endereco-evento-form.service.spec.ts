import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../endereco-evento.test-samples';

import { EnderecoEventoFormService } from './endereco-evento-form.service';

describe('EnderecoEvento Form Service', () => {
  let service: EnderecoEventoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnderecoEventoFormService);
  });

  describe('Service methods', () => {
    describe('createEnderecoEventoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEnderecoEventoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cep: expect.any(Object),
            logradouro: expect.any(Object),
            complemento: expect.any(Object),
            numero: expect.any(Object),
            bairro: expect.any(Object),
            cidade: expect.any(Object),
            uf: expect.any(Object),
            evento: expect.any(Object),
          })
        );
      });

      it('passing IEnderecoEvento should create a new form with FormGroup', () => {
        const formGroup = service.createEnderecoEventoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cep: expect.any(Object),
            logradouro: expect.any(Object),
            complemento: expect.any(Object),
            numero: expect.any(Object),
            bairro: expect.any(Object),
            cidade: expect.any(Object),
            uf: expect.any(Object),
            evento: expect.any(Object),
          })
        );
      });
    });

    describe('getEnderecoEvento', () => {
      it('should return NewEnderecoEvento for default EnderecoEvento initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEnderecoEventoFormGroup(sampleWithNewData);

        const enderecoEvento = service.getEnderecoEvento(formGroup) as any;

        expect(enderecoEvento).toMatchObject(sampleWithNewData);
      });

      it('should return NewEnderecoEvento for empty EnderecoEvento initial value', () => {
        const formGroup = service.createEnderecoEventoFormGroup();

        const enderecoEvento = service.getEnderecoEvento(formGroup) as any;

        expect(enderecoEvento).toMatchObject({});
      });

      it('should return IEnderecoEvento', () => {
        const formGroup = service.createEnderecoEventoFormGroup(sampleWithRequiredData);

        const enderecoEvento = service.getEnderecoEvento(formGroup) as any;

        expect(enderecoEvento).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEnderecoEvento should not enable id FormControl', () => {
        const formGroup = service.createEnderecoEventoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEnderecoEvento should disable id FormControl', () => {
        const formGroup = service.createEnderecoEventoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
