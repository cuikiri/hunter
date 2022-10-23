import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IReuniao } from '../../reuniao/reuniao.model';
import { IDecisao, Decisao } from '../decisao.model';
import { DecisaoService } from '../service/decisao.service';

@Component({
  selector: 'jhi-decisao-update',
  templateUrl: './decisao-update.component.html',
})
export class DecisaoUpdateComponent implements OnInit {
  isSaving = false;
  reuniao?: IReuniao;
  decisao?: IDecisao;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required, Validators.maxLength(50)]],
    obs: [null, [Validators.maxLength(100)]],
  });

  constructor(protected decisaoService: DecisaoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ decisao, reuniao }) => {
      this.reuniao = reuniao;
      this.decisao = decisao;
      this.updateForm(decisao);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const decisao = this.createFromForm();
    decisao.reuniao = this.reuniao;
    if (decisao.id !== undefined) {
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
    this.editForm.patchValue({
      id: decisao.id,
      nome: decisao.nome,
      obs: decisao.obs,
    });
  }

  protected createFromForm(): IDecisao {
    return {
      ...new Decisao(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      obs: this.editForm.get(['obs'])!.value,
    };
  }
}
