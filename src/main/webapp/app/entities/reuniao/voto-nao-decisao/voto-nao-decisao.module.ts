import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VotoNaoDecisaoComponent } from './list/voto-nao-decisao.component';
import { VotoNaoDecisaoDetailComponent } from './detail/voto-nao-decisao-detail.component';
import { VotoNaoDecisaoUpdateComponent } from './update/voto-nao-decisao-update.component';
import { VotoNaoDecisaoDeleteDialogComponent } from './delete/voto-nao-decisao-delete-dialog.component';
import { VotoNaoDecisaoRoutingModule } from './route/voto-nao-decisao-routing.module';

@NgModule({
  imports: [SharedModule, VotoNaoDecisaoRoutingModule],
  declarations: [
    VotoNaoDecisaoComponent,
    VotoNaoDecisaoDetailComponent,
    VotoNaoDecisaoUpdateComponent,
    VotoNaoDecisaoDeleteDialogComponent,
  ],
  entryComponents: [VotoNaoDecisaoDeleteDialogComponent],
})
export class VotoNaoDecisaoModule {}
