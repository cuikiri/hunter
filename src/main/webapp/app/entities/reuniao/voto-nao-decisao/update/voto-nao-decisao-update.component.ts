import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IVotoNaoDecisao, VotoNaoDecisao } from '../voto-nao-decisao.model';
import { VotoNaoDecisaoService } from '../service/voto-nao-decisao.service';
import { IDecisao } from '../../decisao/decisao.model';
import { IReuniao } from '../../reuniao/reuniao.model';
import { DecisaoService } from '../../decisao/service/decisao.service';

@Component({
  selector: 'jhi-voto-nao-decisao-update',
  templateUrl: './voto-nao-decisao-update.component.html',
})
export class VotoNaoDecisaoUpdateComponent implements OnInit {
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
    protected votoNaoDecisaoService: VotoNaoDecisaoService,
    protected decisaoService: DecisaoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ votoNaoDecisao, decisao, reuniao }) => {
      this.decisao = decisao;
      this.reuniao = reuniao;
      this.updateForm(votoNaoDecisao);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const votoNaoDecisao = this.createFromForm();
    votoNaoDecisao.decisao = this.decisao;
    if (votoNaoDecisao.id !== undefined) {
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
    this.editForm.patchValue({
      id: votoNaoDecisao.id,
      nome: votoNaoDecisao.nome,
      obs: votoNaoDecisao.obs,
    });
  }

  protected createFromForm(): IVotoNaoDecisao {
    return {
      ...new VotoNaoDecisao(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      obs: this.editForm.get(['obs'])!.value,
    };
  }
}
