import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PautaFormService, PautaFormGroup } from './pauta-form.service';
import { IPauta } from '../pauta.model';
import { PautaService } from '../service/pauta.service';
import { IReuniao } from 'app/entities/reuniao/reuniao/reuniao.model';
import { ReuniaoService } from 'app/entities/reuniao/reuniao/service/reuniao.service';

@Component({
  selector: 'jhi-pauta-update',
  templateUrl: './pauta-update.component.html',
})
export class PautaUpdateComponent implements OnInit {
  isSaving = false;
  pauta: IPauta | null = null;

  reuniaosSharedCollection: IReuniao[] = [];

  editForm: PautaFormGroup = this.pautaFormService.createPautaFormGroup();

  constructor(
    protected pautaService: PautaService,
    protected pautaFormService: PautaFormService,
    protected reuniaoService: ReuniaoService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareReuniao = (o1: IReuniao | null, o2: IReuniao | null): boolean => this.reuniaoService.compareReuniao(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pauta }) => {
      this.pauta = pauta;
      if (pauta) {
        this.updateForm(pauta);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pauta = this.pautaFormService.getPauta(this.editForm);
    if (pauta.id !== null) {
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
    this.pauta = pauta;
    this.pautaFormService.resetForm(this.editForm, pauta);

    this.reuniaosSharedCollection = this.reuniaoService.addReuniaoToCollectionIfMissing<IReuniao>(
      this.reuniaosSharedCollection,
      pauta.reuniao
    );
  }

  protected loadRelationshipsOptions(): void {
    this.reuniaoService
      .query()
      .pipe(map((res: HttpResponse<IReuniao[]>) => res.body ?? []))
      .pipe(map((reuniaos: IReuniao[]) => this.reuniaoService.addReuniaoToCollectionIfMissing<IReuniao>(reuniaos, this.pauta?.reuniao)))
      .subscribe((reuniaos: IReuniao[]) => (this.reuniaosSharedCollection = reuniaos));
  }
}
