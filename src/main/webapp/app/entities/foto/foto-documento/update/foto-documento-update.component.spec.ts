import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FotoDocumentoFormService } from './foto-documento-form.service';
import { FotoDocumentoService } from '../service/foto-documento.service';
import { IFotoDocumento } from '../foto-documento.model';
import { IDocumento } from 'app/entities/user/documento/documento.model';
import { DocumentoService } from 'app/entities/user/documento/service/documento.service';

import { FotoDocumentoUpdateComponent } from './foto-documento-update.component';

describe('FotoDocumento Management Update Component', () => {
  let comp: FotoDocumentoUpdateComponent;
  let fixture: ComponentFixture<FotoDocumentoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fotoDocumentoFormService: FotoDocumentoFormService;
  let fotoDocumentoService: FotoDocumentoService;
  let documentoService: DocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FotoDocumentoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(FotoDocumentoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FotoDocumentoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fotoDocumentoFormService = TestBed.inject(FotoDocumentoFormService);
    fotoDocumentoService = TestBed.inject(FotoDocumentoService);
    documentoService = TestBed.inject(DocumentoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Documento query and add missing value', () => {
      const fotoDocumento: IFotoDocumento = { id: 456 };
      const documento: IDocumento = { id: 57543 };
      fotoDocumento.documento = documento;

      const documentoCollection: IDocumento[] = [{ id: 90224 }];
      jest.spyOn(documentoService, 'query').mockReturnValue(of(new HttpResponse({ body: documentoCollection })));
      const additionalDocumentos = [documento];
      const expectedCollection: IDocumento[] = [...additionalDocumentos, ...documentoCollection];
      jest.spyOn(documentoService, 'addDocumentoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fotoDocumento });
      comp.ngOnInit();

      expect(documentoService.query).toHaveBeenCalled();
      expect(documentoService.addDocumentoToCollectionIfMissing).toHaveBeenCalledWith(
        documentoCollection,
        ...additionalDocumentos.map(expect.objectContaining)
      );
      expect(comp.documentosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const fotoDocumento: IFotoDocumento = { id: 456 };
      const documento: IDocumento = { id: 37586 };
      fotoDocumento.documento = documento;

      activatedRoute.data = of({ fotoDocumento });
      comp.ngOnInit();

      expect(comp.documentosSharedCollection).toContain(documento);
      expect(comp.fotoDocumento).toEqual(fotoDocumento);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFotoDocumento>>();
      const fotoDocumento = { id: 123 };
      jest.spyOn(fotoDocumentoFormService, 'getFotoDocumento').mockReturnValue(fotoDocumento);
      jest.spyOn(fotoDocumentoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fotoDocumento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fotoDocumento }));
      saveSubject.complete();

      // THEN
      expect(fotoDocumentoFormService.getFotoDocumento).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fotoDocumentoService.update).toHaveBeenCalledWith(expect.objectContaining(fotoDocumento));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFotoDocumento>>();
      const fotoDocumento = { id: 123 };
      jest.spyOn(fotoDocumentoFormService, 'getFotoDocumento').mockReturnValue({ id: null });
      jest.spyOn(fotoDocumentoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fotoDocumento: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fotoDocumento }));
      saveSubject.complete();

      // THEN
      expect(fotoDocumentoFormService.getFotoDocumento).toHaveBeenCalled();
      expect(fotoDocumentoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFotoDocumento>>();
      const fotoDocumento = { id: 123 };
      jest.spyOn(fotoDocumentoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fotoDocumento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fotoDocumentoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDocumento', () => {
      it('Should forward to documentoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(documentoService, 'compareDocumento');
        comp.compareDocumento(entity, entity2);
        expect(documentoService.compareDocumento).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
