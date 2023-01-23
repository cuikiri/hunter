import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IMatricula, Matricula } from '../matricula.model';
import { MatriculaService } from '../service/matricula.service';
import { IReportMatricula, ReportMatricula } from '../report.model';

import * as fileSaver from 'file-saver';

@Component({
  selector: 'jhi-matricula-print',
  templateUrl: './matricula-print.component.html',
})
export class MatriculaPrintComponent implements OnInit {
  isSaving = false;

  matricula?: IMatricula;

  editForm = this.fb.group({
    report: [],
  });

  constructor(protected matriculaService: MatriculaService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ matricula }) => {
      this.matricula = matricula;
    });
  }

  previousState(): void {
    window.history.back();
  }

  print(): void {
    this.isSaving = true;
    const report = this.editForm.get(['report'])!.value;
    const id = this.matricula?.id;
    const dto = new ReportMatricula();
    dto.tipo = 'PDF';
    dto.idMatricula = id;
    dto.tipoDocumento = this.getTipoDocumento(report);
    this.matriculaService.print(dto).subscribe(res => {
      this.downloadFile(res.body, res.headers.get('content-type'), res.headers.get('content-disposition')?.split('filename=')[1], 'PRINT');
      this.isSaving = false;
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
      // const url = window.URL.createObjectURL(blob);
      // window.open(url, filename);
    }
  }

  private getTipoDocumento(tipo: string): number {
    if (tipo === 'esportiva') {
      return 0;
    }
    if (tipo === 'imagem') {
      return 1;
    }
    if (tipo === 'saude') {
      return 2;
    }
    if (tipo === 'projeto') {
      return 3;
    }
    if (tipo === 'lgpd') {
      return 4;
    }
    return -1;
  }
}
