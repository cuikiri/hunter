import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AcaoComponent } from './list/acao.component';
import { AcaoDetailComponent } from './detail/acao-detail.component';
import { AcaoUpdateComponent } from './update/acao-update.component';
import { AcaoDeleteDialogComponent } from './delete/acao-delete-dialog.component';
import { AcaoRoutingModule } from './route/acao-routing.module';

@NgModule({
  imports: [SharedModule, AcaoRoutingModule],
  declarations: [AcaoComponent, AcaoDetailComponent, AcaoUpdateComponent, AcaoDeleteDialogComponent],
  entryComponents: [AcaoDeleteDialogComponent],
})
export class AcaoModule {}
