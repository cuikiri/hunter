import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ParticipanteFormService, ParticipanteFormGroup } from './participante-form.service';
import { IParticipante } from '../participante.model';
import { ParticipanteService } from '../service/participante.service';
import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';
import { ReuniaoService } from 'app/entities/reuniao/reuniao/service/reuniao.service';

@Component({
  selector: 'jhi-participante-update',
  templateUrl: './participante-update.component.html',
})
export class ParticipanteUpdateComponent implements OnInit {
  isSaving = false;
  participante: IParticipante | null = null;

  reuniaosSharedCollection: IReuniao[] = [];

  editForm: ParticipanteFormGroup = this.participanteFormService.createParticipanteFormGroup();

  constructor(
    protected participanteService: ParticipanteService,
    protected participanteFormService: ParticipanteFormService,
    protected reuniaoService: ReuniaoService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareReuniao = (o1: IReuniao | null, o2: IReuniao | null): boolean => this.reuniaoService.compareReuniao(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ participante }) => {
      this.participante = participante;
      if (participante) {
        this.updateForm(participante);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const participante = this.participanteFormService.getParticipante(this.editForm);
    if (participante.id !== null) {
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
    this.participante = participante;
    this.participanteFormService.resetForm(this.editForm, participante);

    this.reuniaosSharedCollection = this.reuniaoService.addReuniaoToCollectionIfMissing<IReuniao>(
      this.reuniaosSharedCollection,
      participante.reuniao
    );
  }

  protected loadRelationshipsOptions(): void {
    this.reuniaoService
      .query()
      .pipe(map((res: HttpResponse<IReuniao[]>) => res.body ?? []))
      .pipe(
        map((reuniaos: IReuniao[]) => this.reuniaoService.addReuniaoToCollectionIfMissing<IReuniao>(reuniaos, this.participante?.reuniao))
      )
      .subscribe((reuniaos: IReuniao[]) => (this.reuniaosSharedCollection = reuniaos));
  }
}
