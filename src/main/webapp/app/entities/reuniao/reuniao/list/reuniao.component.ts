import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as fileSaver from 'file-saver';

import { IReuniao } from '../reuniao.model';
import { IFiltroReuniao, FiltroReuniao } from '../filtroReuniao.models';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { ReuniaoService } from '../service/reuniao.service';
import { ReuniaoDeleteDialogComponent } from '../delete/reuniao-delete-dialog.component';

@Component({
  selector: 'jhi-reuniao',
  templateUrl: './reuniao.component.html',
})
export class ReuniaoComponent implements OnInit {
  reuniaos?: IReuniao[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected reuniaoService: ReuniaoService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.reuniaoService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<IReuniao[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  ngOnInit(): void {
    this.handleNavigation();
  }

  trackId(_index: number, item: IReuniao): number {
    return item.id!;
  }

  delete(reuniao: IReuniao): void {
    const modalRef = this.modalService.open(ReuniaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.reuniao = reuniao;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });
  }

  print(reuniao: IReuniao): void {
    const filtro: IFiltroReuniao = new FiltroReuniao();
    filtro.idReuniao = reuniao.id;
    filtro.tipo = 'PRINT';
    this.reuniaoService.print(filtro).subscribe(res => {
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
      // const url = window.URL.createObjectURL(blob);
      // window.open(url, filename);
    }
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    });
  }

  protected onSuccess(data: IReuniao[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/reuniao'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.reuniaos = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
