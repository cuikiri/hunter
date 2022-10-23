import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDecisao } from '../decisao.model';
import { DecisaoService } from '../service/decisao.service';

@Component({
  templateUrl: './decisao-delete-dialog.component.html',
})
export class DecisaoDeleteDialogComponent {
  decisao?: IDecisao;

  constructor(protected decisaoService: DecisaoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.decisaoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
