import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDecisao } from '../decisao.model';

@Component({
  selector: 'jhi-decisao-detail',
  templateUrl: './decisao-detail.component.html',
})
export class DecisaoDetailComponent implements OnInit {
  decisao: IDecisao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ decisao }) => {
      this.decisao = decisao;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
