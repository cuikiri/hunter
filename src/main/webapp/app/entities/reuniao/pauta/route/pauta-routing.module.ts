import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PautaComponent } from '../list/pauta.component';
import { PautaDetailComponent } from '../detail/pauta-detail.component';
import { PautaUpdateComponent } from '../update/pauta-update.component';
import { PautaRoutingResolveService } from './pauta-routing-resolve.service';
import { PautaRoutingResolveReuniaoService } from './pauta-routing-resolve-reuniao.service';

const pautaRoute: Routes = [
  {
    path: '',
    component: PautaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'reuniao/:idReuniao',
    component: PautaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    resolve: {
      reuniao: PautaRoutingResolveReuniaoService,
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
    path: 'new/reuniao/:idReuniao',
    component: PautaUpdateComponent,
    resolve: {
      pauta: PautaRoutingResolveService,
      reuniao: PautaRoutingResolveReuniaoService,
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
