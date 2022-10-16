import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AcaoFormService, AcaoFormGroup } from './acao-form.service';
import { IAcao } from '../acao.model';
import { AcaoService } from '../service/acao.service';
import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';
import { ReuniaoService } from 'app/entities/reuniao/reuniao/service/reuniao.service';

@Component({
  selector: 'jhi-acao-update',
  templateUrl: './acao-update.component.html',
})
export class AcaoUpdateComponent implements OnInit {
  isSaving = false;
  acao: IAcao | null = null;

  reuniaosSharedCollection: IReuniao[] = [];

  editForm: AcaoFormGroup = this.acaoFormService.createAcaoFormGroup();

  constructor(
    protected acaoService: AcaoService,
    protected acaoFormService: AcaoFormService,
    protected reuniaoService: ReuniaoService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareReuniao = (o1: IReuniao | null, o2: IReuniao | null): boolean => this.reuniaoService.compareReuniao(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ acao }) => {
      this.acao = acao;
      if (acao) {
        this.updateForm(acao);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const acao = this.acaoFormService.getAcao(this.editForm);
    if (acao.id !== null) {
      this.subscribeToSaveResponse(this.acaoService.update(acao));
    } else {
      this.subscribeToSaveResponse(this.acaoService.create(acao));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcao>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(acao: IAcao): void {
    this.acao = acao;
    this.acaoFormService.resetForm(this.editForm, acao);

    this.reuniaosSharedCollection = this.reuniaoService.addReuniaoToCollectionIfMissing<IReuniao>(
      this.reuniaosSharedCollection,
      acao.reuniao
    );
  }

  protected loadRelationshipsOptions(): void {
    this.reuniaoService
      .query()
      .pipe(map((res: HttpResponse<IReuniao[]>) => res.body ?? []))
      .pipe(map((reuniaos: IReuniao[]) => this.reuniaoService.addReuniaoToCollectionIfMissing<IReuniao>(reuniaos, this.acao?.reuniao)))
      .subscribe((reuniaos: IReuniao[]) => (this.reuniaosSharedCollection = reuniaos));
  }
}
