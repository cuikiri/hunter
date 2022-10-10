import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as fileSaver from 'file-saver';

import { FluxoCaixaService } from '../service/fluxo-caixa.service';
import { IFiltroFluxoCaixa, FiltroFluxoCaixa } from '../filtro-fluxo-caixa.model';

@Component({
  selector: 'jhi-fluxo-caixa-report',
  templateUrl: './fluxo-caixa-report.component.html',
})
export class FluxoCaixaReportComponent implements OnInit {
  isPrinting = false;

  editForm = this.fb.group({
    dataInicio: [null, [Validators.required]],
    dataFim: [null, [Validators.required]],
  });

  constructor(protected fluxoCaixaService: FluxoCaixaService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.isPrinting = false;
  }

  print(): void {
    this.isPrinting = true;
    const filtro: IFiltroFluxoCaixa = new FiltroFluxoCaixa();

    filtro.tipo = 'PRINT';
    filtro.dataInicio = this.editForm.get(['dataInicio'])!.value;
    filtro.dataFim = this.editForm.get(['dataFim'])!.value;

    this.fluxoCaixaService.print(filtro).subscribe(res => {
      this.isPrinting = false;
      this.downloadFile(res.body, res.headers.get('content-type'), res.headers.get('content-disposition')?.split('filename=')[1], 'PRINT');
    });
  }

  downloadFile(data: any, contentType: any, filename: any, type: any): void {
    const blob = new Blob([data], { type: contentType.concat('; charset=utf-8') });
    if (type === 'PRINT') {
      const blobUrl = URL.createObjectURL(blob);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = blobUrl;
      document.body.appendChild(iframe);
      if (iframe.contentWindow !== null) {
        iframe.contentWindow.print();
      }
    } else {
      fileSaver.saveAs(blob, filename);
    }
  }

  previousState(): void {
    window.history.back();
  }

  protected subscribeToSaveResponse(result: Observable<any>): void {
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
    this.isPrinting = false;
  }
}
