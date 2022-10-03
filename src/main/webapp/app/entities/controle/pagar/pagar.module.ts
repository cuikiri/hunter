import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PagarComponent } from './list/pagar.component';
import { PagarDetailComponent } from './detail/pagar-detail.component';
import { PagarUpdateComponent } from './update/pagar-update.component';
import { PagarDeleteDialogComponent } from './delete/pagar-delete-dialog.component';
import { PagarRoutingModule } from './route/pagar-routing.module';

@NgModule({
  imports: [SharedModule, PagarRoutingModule],
  declarations: [PagarComponent, PagarDetailComponent, PagarUpdateComponent, PagarDeleteDialogComponent],
  entryComponents: [PagarDeleteDialogComponent],
})
export class PagarModule {}