import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MensagemFormService } from './mensagem-form.service';
import { MensagemService } from '../service/mensagem.service';
import { IMensagem } from '../mensagem.model';
import { ITipoMensagem } from 'app/entities/config/tipo-mensagem/tipo-mensagem.model';
import { TipoMensagemService } from 'app/entities/config/tipo-mensagem/service/tipo-mensagem.service';
import { IDadosPessoais } from 'app/entities/user/dados-pessoais/dados-pessoais.model';
import { DadosPessoaisService } from 'app/entities/user/dados-pessoais/service/dados-pessoais.service';

import { MensagemUpdateComponent } from './mensagem-update.component';

describe('Mensagem Management Update Component', () => {
  let comp: MensagemUpdateComponent;
  let fixture: ComponentFixture<MensagemUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let mensagemFormService: MensagemFormService;
  let mensagemService: MensagemService;
  let tipoMensagemService: TipoMensagemService;
  let dadosPessoaisService: DadosPessoaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MensagemUpdateComponent],
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
      .overrideTemplate(MensagemUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MensagemUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    mensagemFormService = TestBed.inject(MensagemFormService);
    mensagemService = TestBed.inject(MensagemService);
    tipoMensagemService = TestBed.inject(TipoMensagemService);
    dadosPessoaisService = TestBed.inject(DadosPessoaisService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TipoMensagem query and add missing value', () => {
      const mensagem: IMensagem = { id: 456 };
      const tipo: ITipoMensagem = { id: 85569 };
      mensagem.tipo = tipo;

      const tipoMensagemCollection: ITipoMensagem[] = [{ id: 55922 }];
      jest.spyOn(tipoMensagemService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoMensagemCollection })));
      const additionalTipoMensagems = [tipo];
      const expectedCollection: ITipoMensagem[] = [...additionalTipoMensagems, ...tipoMensagemCollection];
      jest.spyOn(tipoMensagemService, 'addTipoMensagemToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ mensagem });
      comp.ngOnInit();

      expect(tipoMensagemService.query).toHaveBeenCalled();
      expect(tipoMensagemService.addTipoMensagemToCollectionIfMissing).toHaveBeenCalledWith(
        tipoMensagemCollection,
        ...additionalTipoMensagems.map(expect.objectContaining)
      );
      expect(comp.tipoMensagemsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DadosPessoais query and add missing value', () => {
      const mensagem: IMensagem = { id: 456 };
      const dadosPessoais: IDadosPessoais = { id: 47110 };
      mensagem.dadosPessoais = dadosPessoais;

      const dadosPessoaisCollection: IDadosPessoais[] = [{ id: 73046 }];
      jest.spyOn(dadosPessoaisService, 'query').mockReturnValue(of(new HttpResponse({ body: dadosPessoaisCollection })));
      const additionalDadosPessoais = [dadosPessoais];
      const expectedCollection: IDadosPessoais[] = [...additionalDadosPessoais, ...dadosPessoaisCollection];
      jest.spyOn(dadosPessoaisService, 'addDadosPessoaisToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ mensagem });
      comp.ngOnInit();

      expect(dadosPessoaisService.query).toHaveBeenCalled();
      expect(dadosPessoaisService.addDadosPessoaisToCollectionIfMissing).toHaveBeenCalledWith(
        dadosPessoaisCollection,
        ...additionalDadosPessoais.map(expect.objectContaining)
      );
      expect(comp.dadosPessoaisSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const mensagem: IMensagem = { id: 456 };
      const tipo: ITipoMensagem = { id: 2006 };
      mensagem.tipo = tipo;
      const dadosPessoais: IDadosPessoais = { id: 75577 };
      mensagem.dadosPessoais = dadosPessoais;

      activatedRoute.data = of({ mensagem });
      comp.ngOnInit();

      expect(comp.tipoMensagemsSharedCollection).toContain(tipo);
      expect(comp.dadosPessoaisSharedCollection).toContain(dadosPessoais);
      expect(comp.mensagem).toEqual(mensagem);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMensagem>>();
      const mensagem = { id: 123 };
      jest.spyOn(mensagemFormService, 'getMensagem').mockReturnValue(mensagem);
      jest.spyOn(mensagemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mensagem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: mensagem }));
      saveSubject.complete();

      // THEN
      expect(mensagemFormService.getMensagem).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(mensagemService.update).toHaveBeenCalledWith(expect.objectContaining(mensagem));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMensagem>>();
      const mensagem = { id: 123 };
      jest.spyOn(mensagemFormService, 'getMensagem').mockReturnValue({ id: null });
      jest.spyOn(mensagemService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mensagem: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: mensagem }));
      saveSubject.complete();

      // THEN
      expect(mensagemFormService.getMensagem).toHaveBeenCalled();
      expect(mensagemService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMensagem>>();
      const mensagem = { id: 123 };
      jest.spyOn(mensagemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mensagem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(mensagemService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTipoMensagem', () => {
      it('Should forward to tipoMensagemService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tipoMensagemService, 'compareTipoMensagem');
        comp.compareTipoMensagem(entity, entity2);
        expect(tipoMensagemService.compareTipoMensagem).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDadosPessoais', () => {
      it('Should forward to dadosPessoaisService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(dadosPessoaisService, 'compareDadosPessoais');
        comp.compareDadosPessoais(entity, entity2);
        expect(dadosPessoaisService.compareDadosPessoais).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
