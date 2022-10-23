import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IVotoSimDecisao, VotoSimDecisao } from '../voto-sim-decisao.model';
import { VotoSimDecisaoService } from '../service/voto-sim-decisao.service';
import { IDecisao } from '../../decisao/decisao.model';
import { IReuniao } from '../../reuniao/reuniao.model';
import { DecisaoService } from '../../decisao/service/decisao.service';

@Component({
  selector: 'jhi-voto-sim-decisao-update',
  templateUrl: './voto-sim-decisao-update.component.html',
})
export class VotoSimDecisaoUpdateComponent implements OnInit {
  isSaving = false;
  decisao?: IDecisao;
  reuniao?: IReuniao;

  decisaosSharedCollection: IDecisao[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required, Validators.maxLength(50)]],
    obs: [null, [Validators.maxLength(100)]],
  });

  constructor(
    protected votoSimDecisaoService: VotoSimDecisaoService,
    protected decisaoService: DecisaoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ votoSimDecisao, decisao, reuniao }) => {
      this.decisao = decisao;
      this.reuniao = reuniao;
      this.updateForm(votoSimDecisao);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const votoSimDecisao = this.createFromForm();
    votoSimDecisao.decisao = this.decisao;
    if (votoSimDecisao.id !== undefined) {
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
    this.editForm.patchValue({
      id: votoSimDecisao.id,
      nome: votoSimDecisao.nome,
      obs: votoSimDecisao.obs,
    });

    this.decisaosSharedCollection = this.decisaoService.addDecisaoToCollectionIfMissing(
      this.decisaosSharedCollection,
      votoSimDecisao.decisao
    );
  }

  protected createFromForm(): IVotoSimDecisao {
    return {
      ...new VotoSimDecisao(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      obs: this.editForm.get(['obs'])!.value,
    };
  }
}
