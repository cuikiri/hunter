import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ReuniaoFormService, ReuniaoFormGroup } from './reuniao-form.service';
import { IReuniao } from '../reuniao.model';
import { ReuniaoService } from '../service/reuniao.service';
import { TipoReuniao } from 'app/entities/enumerations/tipo-reuniao.model';

@Component({
  selector: 'jhi-reuniao-update',
  templateUrl: './reuniao-update.component.html',
})
export class ReuniaoUpdateComponent implements OnInit {
  isSaving = false;
  reuniao: IReuniao | null = null;
  tipoReuniaoValues = Object.keys(TipoReuniao);

  editForm: ReuniaoFormGroup = this.reuniaoFormService.createReuniaoFormGroup();

  constructor(
    protected reuniaoService: ReuniaoService,
    protected reuniaoFormService: ReuniaoFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reuniao }) => {
      this.reuniao = reuniao;
      if (reuniao) {
        this.updateForm(reuniao);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reuniao = this.reuniaoFormService.getReuniao(this.editForm);
    if (reuniao.id !== null) {
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
    this.reuniao = reuniao;
    this.reuniaoFormService.resetForm(this.editForm, reuniao);
  }
}
