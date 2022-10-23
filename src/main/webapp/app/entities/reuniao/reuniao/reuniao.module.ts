import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ReuniaoComponent } from './list/reuniao.component';
import { ReuniaoDetailComponent } from './detail/reuniao-detail.component';
import { ReuniaoUpdateComponent } from './update/reuniao-update.component';
import { ReuniaoDeleteDialogComponent } from './delete/reuniao-delete-dialog.component';
import { ReuniaoRoutingModule } from './route/reuniao-routing.module';

@NgModule({
  imports: [SharedModule, ReuniaoRoutingModule],
  declarations: [ReuniaoComponent, ReuniaoDetailComponent, ReuniaoUpdateComponent, ReuniaoDeleteDialogComponent],
  entryComponents: [ReuniaoDeleteDialogComponent],
})
export class ReuniaoModule {}
