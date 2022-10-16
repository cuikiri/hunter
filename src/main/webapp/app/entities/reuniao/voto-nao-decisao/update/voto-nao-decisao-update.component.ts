import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { VotoNaoDecisaoFormService, VotoNaoDecisaoFormGroup } from './voto-nao-decisao-form.service';
import { IVotoNaoDecisao } from '../voto-nao-decisao.model';
import { VotoNaoDecisaoService } from '../service/voto-nao-decisao.service';
import { IDecisao } from 'app/entities/reuniao/decisao/decisao.model';
import { DecisaoService } from 'app/entities/reuniao/decisao/service/decisao.service';

@Component({
  selector: 'jhi-voto-nao-decisao-update',
  templateUrl: './voto-nao-decisao-update.component.html',
})
export class VotoNaoDecisaoUpdateComponent implements OnInit {
  isSaving = false;
  votoNaoDecisao: IVotoNaoDecisao | null = null;

  decisaosSharedCollection: IDecisao[] = [];

  editForm: VotoNaoDecisaoFormGroup = this.votoNaoDecisaoFormService.createVotoNaoDecisaoFormGroup();

  constructor(
    protected votoNaoDecisaoService: VotoNaoDecisaoService,
    protected votoNaoDecisaoFormService: VotoNaoDecisaoFormService,
    protected decisaoService: DecisaoService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDecisao = (o1: IDecisao | null, o2: IDecisao | null): boolean => this.decisaoService.compareDecisao(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ votoNaoDecisao }) => {
      this.votoNaoDecisao = votoNaoDecisao;
      if (votoNaoDecisao) {
        this.updateForm(votoNaoDecisao);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const votoNaoDecisao = this.votoNaoDecisaoFormService.getVotoNaoDecisao(this.editForm);
    if (votoNaoDecisao.id !== null) {
      this.subscribeToSaveResponse(this.votoNaoDecisaoService.update(votoNaoDecisao));
    } else {
      this.subscribeToSaveResponse(this.votoNaoDecisaoService.create(votoNaoDecisao));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVotoNaoDecisao>>): void {
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

  protected updateForm(votoNaoDecisao: IVotoNaoDecisao): void {
    this.votoNaoDecisao = votoNaoDecisao;
    this.votoNaoDecisaoFormService.resetForm(this.editForm, votoNaoDecisao);

    this.decisaosSharedCollection = this.decisaoService.addDecisaoToCollectionIfMissing<IDecisao>(
      this.decisaosSharedCollection,
      votoNaoDecisao.decisao
    );
  }

  protected loadRelationshipsOptions(): void {
    this.decisaoService
      .query()
      .pipe(map((res: HttpResponse<IDecisao[]>) => res.body ?? []))
      .pipe(
        map((decisaos: IDecisao[]) => this.decisaoService.addDecisaoToCollectionIfMissing<IDecisao>(decisaos, this.votoNaoDecisao?.decisao))
      )
      .subscribe((decisaos: IDecisao[]) => (this.decisaosSharedCollection = decisaos));
  }
}
