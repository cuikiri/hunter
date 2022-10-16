import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DecisaoFormService, DecisaoFormGroup } from './decisao-form.service';
import { IDecisao } from '../decisao.model';
import { DecisaoService } from '../service/decisao.service';
import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';
import { ReuniaoService } from 'app/entities/reuniao/reuniao/service/reuniao.service';

@Component({
  selector: 'jhi-decisao-update',
  templateUrl: './decisao-update.component.html',
})
export class DecisaoUpdateComponent implements OnInit {
  isSaving = false;
  decisao: IDecisao | null = null;

  reuniaosSharedCollection: IReuniao[] = [];

  editForm: DecisaoFormGroup = this.decisaoFormService.createDecisaoFormGroup();

  constructor(
    protected decisaoService: DecisaoService,
    protected decisaoFormService: DecisaoFormService,
    protected reuniaoService: ReuniaoService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareReuniao = (o1: IReuniao | null, o2: IReuniao | null): boolean => this.reuniaoService.compareReuniao(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ decisao }) => {
      this.decisao = decisao;
      if (decisao) {
        this.updateForm(decisao);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const decisao = this.decisaoFormService.getDecisao(this.editForm);
    if (decisao.id !== null) {
      this.subscribeToSaveResponse(this.decisaoService.update(decisao));
    } else {
      this.subscribeToSaveResponse(this.decisaoService.create(decisao));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDecisao>>): void {
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

  protected updateForm(decisao: IDecisao): void {
    this.decisao = decisao;
    this.decisaoFormService.resetForm(this.editForm, decisao);

    this.reuniaosSharedCollection = this.reuniaoService.addReuniaoToCollectionIfMissing<IReuniao>(
      this.reuniaosSharedCollection,
      decisao.reuniao
    );
  }

  protected loadRelationshipsOptions(): void {
    this.reuniaoService
      .query()
      .pipe(map((res: HttpResponse<IReuniao[]>) => res.body ?? []))
      .pipe(map((reuniaos: IReuniao[]) => this.reuniaoService.addReuniaoToCollectionIfMissing<IReuniao>(reuniaos, this.decisao?.reuniao)))
      .subscribe((reuniaos: IReuniao[]) => (this.reuniaosSharedCollection = reuniaos));
  }
}
