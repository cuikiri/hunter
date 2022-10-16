import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVotoNaoDecisao } from '../voto-nao-decisao.model';

@Component({
  selector: 'jhi-voto-nao-decisao-detail',
  templateUrl: './voto-nao-decisao-detail.component.html',
})
export class VotoNaoDecisaoDetailComponent implements OnInit {
  votoNaoDecisao: IVotoNaoDecisao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ votoNaoDecisao }) => {
      this.votoNaoDecisao = votoNaoDecisao;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
