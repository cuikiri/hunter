import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstoque } from '../estoque.model';
import { EstoqueService } from '../service/estoque.service';

@Component({
  templateUrl: './estoque-delete-dialog.component.html',
})
export class EstoqueDeleteDialogComponent {
  estoque?: IEstoque;

  constructor(protected estoqueService: EstoqueService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estoqueService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
