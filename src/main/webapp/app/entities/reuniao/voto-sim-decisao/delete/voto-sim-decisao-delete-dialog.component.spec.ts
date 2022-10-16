jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { VotoSimDecisaoService } from '../service/voto-sim-decisao.service';

import { VotoSimDecisaoDeleteDialogComponent } from './voto-sim-decisao-delete-dialog.component';

describe('VotoSimDecisao Management Delete Component', () => {
  let comp: VotoSimDecisaoDeleteDialogComponent;
  let fixture: ComponentFixture<VotoSimDecisaoDeleteDialogComponent>;
  let service: VotoSimDecisaoService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [VotoSimDecisaoDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(VotoSimDecisaoDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(VotoSimDecisaoDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VotoSimDecisaoService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
