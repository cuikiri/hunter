import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PautaComponent } from '../list/pauta.component';
import { PautaDetailComponent } from '../detail/pauta-detail.component';
import { PautaUpdateComponent } from '../update/pauta-update.component';
import { PautaRoutingResolveService } from './pauta-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const pautaRoute: Routes = [
  {
    path: '',
    component: PautaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PautaDetailComponent,
    resolve: {
      pauta: PautaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PautaUpdateComponent,
    resolve: {
      pauta: PautaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PautaUpdateComponent,
    resolve: {
      pauta: PautaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pautaRoute)],
  exports: [RouterModule],
})
export class PautaRoutingModule {}
