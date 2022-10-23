import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IReuniao } from '../../reuniao/reuniao.model';
import { IAcao, Acao } from '../acao.model';
import { AcaoService } from '../service/acao.service';

@Component({
  selector: 'jhi-acao-update',
  templateUrl: './acao-update.component.html',
})
export class AcaoUpdateComponent implements OnInit {
  isSaving = false;
  reuniao?: IReuniao;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required, Validators.maxLength(50)]],
    obs: [null, [Validators.maxLength(100)]],
  });

  constructor(protected acaoService: AcaoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ acao, reuniao }) => {
      this.reuniao = reuniao;
      this.updateForm(acao);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const acao = this.createFromForm();
    acao.reuniao = this.reuniao;

    if (acao.id !== undefined) {
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
    this.editForm.patchValue({
      id: acao.id,
      nome: acao.nome,
      obs: acao.obs,
    });
  }

  protected createFromForm(): IAcao {
    return {
      ...new Acao(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      obs: this.editForm.get(['obs'])!.value,
    };
  }
}
