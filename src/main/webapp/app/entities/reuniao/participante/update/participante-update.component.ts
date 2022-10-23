import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IReuniao } from '../../reuniao/reuniao.model';
import { IParticipante, Participante } from '../participante.model';
import { ParticipanteService } from '../service/participante.service';

@Component({
  selector: 'jhi-participante-update',
  templateUrl: './participante-update.component.html',
})
export class ParticipanteUpdateComponent implements OnInit {
  isSaving = false;
  reuniao?: IReuniao;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required, Validators.maxLength(50)]],
    obs: [null, [Validators.maxLength(100)]],
  });

  constructor(protected participanteService: ParticipanteService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ participante, reuniao }) => {
      this.reuniao = reuniao;
      this.updateForm(participante);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const participante = this.createFromForm();
    participante.reuniao = this.reuniao;
    if (participante.id !== undefined) {
      this.subscribeToSaveResponse(this.participanteService.update(participante));
    } else {
      this.subscribeToSaveResponse(this.participanteService.create(participante));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParticipante>>): void {
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

  protected updateForm(participante: IParticipante): void {
    this.editForm.patchValue({
      id: participante.id,
      nome: participante.nome,
      obs: participante.obs,
    });
  }

  protected createFromForm(): IParticipante {
    return {
      ...new Participante(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      obs: this.editForm.get(['obs'])!.value,
    };
  }
}
