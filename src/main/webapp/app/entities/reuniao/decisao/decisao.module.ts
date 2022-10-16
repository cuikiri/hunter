import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DecisaoComponent } from './list/decisao.component';
import { DecisaoDetailComponent } from './detail/decisao-detail.component';
import { DecisaoUpdateComponent } from './update/decisao-update.component';
import { DecisaoDeleteDialogComponent } from './delete/decisao-delete-dialog.component';
import { DecisaoRoutingModule } from './route/decisao-routing.module';

@NgModule({
  imports: [SharedModule, DecisaoRoutingModule],
  declarations: [DecisaoComponent, DecisaoDetailComponent, DecisaoUpdateComponent, DecisaoDeleteDialogComponent],
})
export class DecisaoModule {}
