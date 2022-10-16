import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVotoSimDecisao } from '../voto-sim-decisao.model';

@Component({
  selector: 'jhi-voto-sim-decisao-detail',
  templateUrl: './voto-sim-decisao-detail.component.html',
})
export class VotoSimDecisaoDetailComponent implements OnInit {
  votoSimDecisao: IVotoSimDecisao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ votoSimDecisao }) => {
      this.votoSimDecisao = votoSimDecisao;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
