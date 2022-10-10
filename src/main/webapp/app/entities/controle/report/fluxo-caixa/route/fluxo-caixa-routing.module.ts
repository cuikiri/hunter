import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FluxoCaixaReportComponent } from '../detail/fluxo-caixa-report.component';

const fluxocaixaRoute: Routes = [
  {
    path: '',
    component: FluxoCaixaReportComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fluxocaixaRoute)],
  exports: [RouterModule],
})
export class FluxoCAixaRoutingModule {}
