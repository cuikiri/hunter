import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcao } from '../acao.model';

@Component({
  selector: 'jhi-acao-detail',
  templateUrl: './acao-detail.component.html',
})
export class AcaoDetailComponent implements OnInit {
  acao: IAcao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ acao }) => {
      this.acao = acao;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
