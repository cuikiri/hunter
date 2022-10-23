import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAcao } from '../acao.model';
import { AcaoService } from '../service/acao.service';

@Component({
  templateUrl: './acao-delete-dialog.component.html',
})
export class AcaoDeleteDialogComponent {
  acao?: IAcao;

  constructor(protected acaoService: AcaoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.acaoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
