import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPauta } from '../pauta.model';
import { PautaService } from '../service/pauta.service';

@Component({
  templateUrl: './pauta-delete-dialog.component.html',
})
export class PautaDeleteDialogComponent {
  pauta?: IPauta;

  constructor(protected pautaService: PautaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pautaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
