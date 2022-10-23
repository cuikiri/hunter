import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVotoSimDecisao } from '../voto-sim-decisao.model';
import { VotoSimDecisaoService } from '../service/voto-sim-decisao.service';

@Component({
  templateUrl: './voto-sim-decisao-delete-dialog.component.html',
})
export class VotoSimDecisaoDeleteDialogComponent {
  votoSimDecisao?: IVotoSimDecisao;

  constructor(protected votoSimDecisaoService: VotoSimDecisaoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.votoSimDecisaoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
