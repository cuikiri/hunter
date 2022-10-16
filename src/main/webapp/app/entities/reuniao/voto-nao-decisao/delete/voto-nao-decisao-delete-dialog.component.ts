import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVotoNaoDecisao } from '../voto-nao-decisao.model';
import { VotoNaoDecisaoService } from '../service/voto-nao-decisao.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './voto-nao-decisao-delete-dialog.component.html',
})
export class VotoNaoDecisaoDeleteDialogComponent {
  votoNaoDecisao?: IVotoNaoDecisao;

  constructor(protected votoNaoDecisaoService: VotoNaoDecisaoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.votoNaoDecisaoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
