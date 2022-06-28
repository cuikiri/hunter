import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IFotoAvatar, FotoAvatar } from '../foto-avatar.model';
import { FotoAvatarService } from '../service/foto-avatar.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-foto-avatar-update',
  templateUrl: './foto-avatar-update.component.html',
})
export class FotoAvatarUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    conteudo: [null, [Validators.required]],
    conteudoContentType: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected fotoAvatarService: FotoAvatarService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fotoAvatar }) => {
      this.updateForm(fotoAvatar);
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('hunterappApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fotoAvatar = this.createFromForm();
    if (fotoAvatar.id !== undefined) {
      this.subscribeToSaveResponse(this.fotoAvatarService.update(fotoAvatar));
    } else {
      this.subscribeToSaveResponse(this.fotoAvatarService.create(fotoAvatar));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFotoAvatar>>): void {
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

  protected updateForm(fotoAvatar: IFotoAvatar): void {
    this.editForm.patchValue({
      id: fotoAvatar.id,
      conteudo: fotoAvatar.conteudo,
      conteudoContentType: fotoAvatar.conteudoContentType,
    });
  }

  protected createFromForm(): IFotoAvatar {
    return {
      ...new FotoAvatar(),
      id: this.editForm.get(['id'])!.value,
      conteudoContentType: this.editForm.get(['conteudoContentType'])!.value,
      conteudo: this.editForm.get(['conteudo'])!.value,
    };
  }
}
