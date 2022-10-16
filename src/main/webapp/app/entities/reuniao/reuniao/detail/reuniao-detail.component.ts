import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReuniao } from '../reuniao.model';

@Component({
  selector: 'jhi-reuniao-detail',
  templateUrl: './reuniao-detail.component.html',
})
export class ReuniaoDetailComponent implements OnInit {
  reuniao: IReuniao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reuniao }) => {
      this.reuniao = reuniao;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
