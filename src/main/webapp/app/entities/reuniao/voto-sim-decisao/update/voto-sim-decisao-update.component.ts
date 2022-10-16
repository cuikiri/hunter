import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { VotoSimDecisaoFormService, VotoSimDecisaoFormGroup } from './voto-sim-decisao-form.service';
import { IVotoSimDecisao } from '../voto-sim-decisao.model';
import { VotoSimDecisaoService } from '../service/voto-sim-decisao.service';
import { IDecisao } from 'app/entities/reuniao/decisao/decisao.model';
import { DecisaoService } from 'app/entities/reuniao/decisao/service/decisao.service';

@Component({
  selector: 'jhi-voto-sim-decisao-update',
  templateUrl: './voto-sim-decisao-update.component.html',
})
export class VotoSimDecisaoUpdateComponent implements OnInit {
  isSaving = false;
  votoSimDecisao: IVotoSimDecisao | null = null;

  decisaosSharedCollection: IDecisao[] = [];

  editForm: VotoSimDecisaoFormGroup = this.votoSimDecisaoFormService.createVotoSimDecisaoFormGroup();

  constructor(
    protected votoSimDecisaoService: VotoSimDecisaoService,
    protected votoSimDecisaoFormService: VotoSimDecisaoFormService,
    protected decisaoService: DecisaoService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDecisao = (o1: IDecisao | null, o2: IDecisao | null): boolean => this.decisaoService.compareDecisao(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ votoSimDecisao }) => {
      this.votoSimDecisao = votoSimDecisao;
      if (votoSimDecisao) {
        this.updateForm(votoSimDecisao);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const votoSimDecisao = this.votoSimDecisaoFormService.getVotoSimDecisao(this.editForm);
    if (votoSimDecisao.id !== null) {
      this.subscribeToSaveResponse(this.votoSimDecisaoService.update(votoSimDecisao));
    } else {
      this.subscribeToSaveResponse(this.votoSimDecisaoService.create(votoSimDecisao));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVotoSimDecisao>>): void {
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

  protected updateForm(votoSimDecisao: IVotoSimDecisao): void {
    this.votoSimDecisao = votoSimDecisao;
    this.votoSimDecisaoFormService.resetForm(this.editForm, votoSimDecisao);

    this.decisaosSharedCollection = this.decisaoService.addDecisaoToCollectionIfMissing<IDecisao>(
      this.decisaosSharedCollection,
      votoSimDecisao.decisao
    );
  }

  protected loadRelationshipsOptions(): void {
    this.decisaoService
      .query()
      .pipe(map((res: HttpResponse<IDecisao[]>) => res.body ?? []))
      .pipe(
        map((decisaos: IDecisao[]) => this.decisaoService.addDecisaoToCollectionIfMissing<IDecisao>(decisaos, this.votoSimDecisao?.decisao))
      )
      .subscribe((decisaos: IDecisao[]) => (this.decisaosSharedCollection = decisaos));
  }
}
