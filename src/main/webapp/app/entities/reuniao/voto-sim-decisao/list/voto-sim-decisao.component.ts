import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVotoSimDecisao } from '../voto-sim-decisao.model';
import { IDecisao } from '../../decisao/decisao.model';
import { IReuniao } from '../../reuniao/reuniao.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { VotoSimDecisaoService } from '../service/voto-sim-decisao.service';
import { VotoSimDecisaoDeleteDialogComponent } from '../delete/voto-sim-decisao-delete-dialog.component';

@Component({
  selector: 'jhi-voto-sim-decisao',
  templateUrl: './voto-sim-decisao.component.html',
})
export class VotoSimDecisaoComponent implements OnInit {
  votoSimDecisaos?: IVotoSimDecisao[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  decisao?: IDecisao;
  reuniao?: IReuniao;

  constructor(
    protected votoSimDecisaoService: VotoSimDecisaoService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;
    const id = this.decisao?.id;

    this.votoSimDecisaoService
      .findAllByDecicaoId(id ?? 0, {
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<IVotoSimDecisao[]>) => {
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
    this.activatedRoute.data.subscribe(({ decisao, reuniao }) => {
      this.decisao = decisao;
      this.reuniao = reuniao;
    });
    this.handleNavigation();
  }

  trackId(_index: number, item: IVotoSimDecisao): number {
    return item.id!;
  }

  delete(votoSimDecisao: IVotoSimDecisao): void {
    const modalRef = this.modalService.open(VotoSimDecisaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.votoSimDecisao = votoSimDecisao;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });
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

  protected onSuccess(data: IVotoSimDecisao[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/voto-sim-decisao'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.votoSimDecisaos = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
