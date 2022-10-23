import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PautaComponent } from './list/pauta.component';
import { PautaDetailComponent } from './detail/pauta-detail.component';
import { PautaUpdateComponent } from './update/pauta-update.component';
import { PautaDeleteDialogComponent } from './delete/pauta-delete-dialog.component';
import { PautaRoutingModule } from './route/pauta-routing.module';

@NgModule({
  imports: [SharedModule, PautaRoutingModule],
  declarations: [PautaComponent, PautaDetailComponent, PautaUpdateComponent, PautaDeleteDialogComponent],
  entryComponents: [PautaDeleteDialogComponent],
})
export class PautaModule {}
