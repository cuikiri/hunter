import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPauta, Pauta } from '../pauta.model';
import { PautaService } from '../service/pauta.service';
import { IReuniao } from '../../reuniao/reuniao.model';

@Component({
  selector: 'jhi-pauta-update',
  templateUrl: './pauta-update.component.html',
})
export class PautaUpdateComponent implements OnInit {
  isSaving = false;
  reuniao?: IReuniao;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required, Validators.maxLength(50)]],
    obs: [null, [Validators.maxLength(100)]],
  });

  constructor(protected pautaService: PautaService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pauta, reuniao }) => {
      this.reuniao = reuniao;
      this.updateForm(pauta);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pauta = this.createFromForm();
    pauta.reuniao = this.reuniao;
    if (pauta.id !== undefined) {
      this.subscribeToSaveResponse(this.pautaService.update(pauta));
    } else {
      this.subscribeToSaveResponse(this.pautaService.create(pauta));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPauta>>): void {
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

  protected updateForm(pauta: IPauta): void {
    this.editForm.patchValue({
      id: pauta.id,
      nome: pauta.nome,
      obs: pauta.obs,
    });
  }

  protected createFromForm(): IPauta {
    return {
      ...new Pauta(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      obs: this.editForm.get(['obs'])!.value,
    };
  }
}
