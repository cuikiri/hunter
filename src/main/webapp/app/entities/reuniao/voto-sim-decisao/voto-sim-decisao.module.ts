import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VotoSimDecisaoComponent } from './list/voto-sim-decisao.component';
import { VotoSimDecisaoDetailComponent } from './detail/voto-sim-decisao-detail.component';
import { VotoSimDecisaoUpdateComponent } from './update/voto-sim-decisao-update.component';
import { VotoSimDecisaoDeleteDialogComponent } from './delete/voto-sim-decisao-delete-dialog.component';
import { VotoSimDecisaoRoutingModule } from './route/voto-sim-decisao-routing.module';

@NgModule({
  imports: [SharedModule, VotoSimDecisaoRoutingModule],
  declarations: [
    VotoSimDecisaoComponent,
    VotoSimDecisaoDetailComponent,
    VotoSimDecisaoUpdateComponent,
    VotoSimDecisaoDeleteDialogComponent,
  ],
})
export class VotoSimDecisaoModule {}
