import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PagarComponent } from './list/pagar.component';
import { PagarDetailComponent } from './detail/pagar-detail.component';
import { PagarUpdateComponent } from './update/pagar-update.component';
import { PagarDeleteDialogComponent } from './delete/pagar-delete-dialog.component';
import { PagarRoutingModule } from './route/pagar-routing.module';
import { PagarReportComponent } from './report/pagar-report.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  imports: [SharedModule, PagarRoutingModule, CurrencyMaskModule],
  declarations: [PagarComponent, PagarDetailComponent, PagarUpdateComponent, PagarDeleteDialogComponent, PagarReportComponent],
  entryComponents: [PagarDeleteDialogComponent],
})
export class PagarModule {}
