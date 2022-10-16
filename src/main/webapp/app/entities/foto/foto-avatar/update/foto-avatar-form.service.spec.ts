import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../foto-avatar.test-samples';

import { FotoAvatarFormService } from './foto-avatar-form.service';

describe('FotoAvatar Form Service', () => {
  let service: FotoAvatarFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoAvatarFormService);
  });

  describe('Service methods', () => {
    describe('createFotoAvatarFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFotoAvatarFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
          })
        );
      });

      it('passing IFotoAvatar should create a new form with FormGroup', () => {
        const formGroup = service.createFotoAvatarFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            conteudo: expect.any(Object),
          })
        );
      });
    });

    describe('getFotoAvatar', () => {
      it('should return NewFotoAvatar for default FotoAvatar initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFotoAvatarFormGroup(sampleWithNewData);

        const fotoAvatar = service.getFotoAvatar(formGroup) as any;

        expect(fotoAvatar).toMatchObject(sampleWithNewData);
      });

      it('should return NewFotoAvatar for empty FotoAvatar initial value', () => {
        const formGroup = service.createFotoAvatarFormGroup();

        const fotoAvatar = service.getFotoAvatar(formGroup) as any;

        expect(fotoAvatar).toMatchObject({});
      });

      it('should return IFotoAvatar', () => {
        const formGroup = service.createFotoAvatarFormGroup(sampleWithRequiredData);

        const fotoAvatar = service.getFotoAvatar(formGroup) as any;

        expect(fotoAvatar).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFotoAvatar should not enable id FormControl', () => {
        const formGroup = service.createFotoAvatarFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFotoAvatar should disable id FormControl', () => {
        const formGroup = service.createFotoAvatarFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
