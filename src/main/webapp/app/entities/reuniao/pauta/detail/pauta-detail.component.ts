import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPauta } from '../pauta.model';

@Component({
  selector: 'jhi-pauta-detail',
  templateUrl: './pauta-detail.component.html',
})
export class PautaDetailComponent implements OnInit {
  pauta: IPauta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pauta }) => {
      this.pauta = pauta;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
