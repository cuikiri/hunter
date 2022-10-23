import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IReuniao, Reuniao } from '../reuniao.model';
import { ReuniaoService } from '../service/reuniao.service';
import { TipoReuniao } from 'app/entities/enumerations/tipo-reuniao.model';

@Component({
  selector: 'jhi-reuniao-update',
  templateUrl: './reuniao-update.component.html',
})
export class ReuniaoUpdateComponent implements OnInit {
  isSaving = false;
  tipoReuniaoValues = Object.keys(TipoReuniao);
  reuniao: IReuniao | null = null;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required, Validators.maxLength(50)]],
    descricao: [null, [Validators.required, Validators.maxLength(1000)]],
    data: [null, [Validators.required]],
    dataInicio: [],
    dataFim: [],
    horaInicio: [null, [Validators.maxLength(5)]],
    horaFim: [null, [Validators.maxLength(5)]],
    tipoReuniao: [],
    obs: [null, [Validators.maxLength(100)]],
  });

  constructor(protected reuniaoService: ReuniaoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reuniao }) => {
      this.reuniao = reuniao;
      this.updateForm(reuniao);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reuniao = this.createFromForm();
    if (reuniao.id !== undefined) {
      this.subscribeToSaveResponse(this.reuniaoService.update(reuniao));
    } else {
      this.subscribeToSaveResponse(this.reuniaoService.create(reuniao));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReuniao>>): void {
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

  protected updateForm(reuniao: IReuniao): void {
    this.editForm.patchValue({
      id: reuniao.id,
      nome: reuniao.nome,
      descricao: reuniao.descricao,
      data: reuniao.data,
      dataInicio: reuniao.dataInicio,
      dataFim: reuniao.dataFim,
      horaInicio: reuniao.horaInicio,
      horaFim: reuniao.horaFim,
      tipoReuniao: reuniao.tipoReuniao,
      obs: reuniao.obs,
    });
  }

  protected createFromForm(): IReuniao {
    return {
      ...new Reuniao(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      data: this.editForm.get(['data'])!.value,
      dataInicio: this.editForm.get(['dataInicio'])!.value,
      dataFim: this.editForm.get(['dataFim'])!.value,
      horaInicio: this.editForm.get(['horaInicio'])!.value,
      horaFim: this.editForm.get(['horaFim'])!.value,
      tipoReuniao: this.editForm.get(['tipoReuniao'])!.value,
      obs: this.editForm.get(['obs'])!.value,
    };
  }
}
