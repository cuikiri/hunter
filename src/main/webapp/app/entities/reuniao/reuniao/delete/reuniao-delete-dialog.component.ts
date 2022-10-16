import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IReuniao } from '../reuniao.model';
import { ReuniaoService } from '../service/reuniao.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './reuniao-delete-dialog.component.html',
})
export class ReuniaoDeleteDialogComponent {
  reuniao?: IReuniao;

  constructor(protected reuniaoService: ReuniaoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reuniaoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
