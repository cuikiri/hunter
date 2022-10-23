import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VotoSimDecisaoComponent } from '../list/voto-sim-decisao.component';
import { VotoSimDecisaoDetailComponent } from '../detail/voto-sim-decisao-detail.component';
import { VotoSimDecisaoUpdateComponent } from '../update/voto-sim-decisao-update.component';
import { VotoSimDecisaoRoutingResolveService } from './voto-sim-decisao-routing-resolve.service';
import { VotoSimRoutingResolveDecisaoService } from './voto-sim-decisao-routing-resolve-reuniao.service';
import { VotoSimRoutingResolveReuniaoService } from './voto-nao-decisao-routing-resolve-reuniao.service';

const votoSimDecisaoRoute: Routes = [
  {
    path: '',
    component: VotoSimDecisaoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'reuniao/:idReuniao/decisao/:idDecisao',
    component: VotoSimDecisaoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    resolve: {
      decisao: VotoSimRoutingResolveDecisaoService,
      reuniao: VotoSimRoutingResolveReuniaoService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VotoSimDecisaoDetailComponent,
    resolve: {
      votoSimDecisao: VotoSimDecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VotoSimDecisaoUpdateComponent,
    resolve: {
      votoSimDecisao: VotoSimDecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new/reuniao/:idReuniao/decisao/:idDecisao',
    component: VotoSimDecisaoUpdateComponent,
    resolve: {
      votoSimDecisao: VotoSimDecisaoRoutingResolveService,
      decisao: VotoSimRoutingResolveDecisaoService,
      reuniao: VotoSimRoutingResolveReuniaoService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VotoSimDecisaoUpdateComponent,
    resolve: {
      votoSimDecisao: VotoSimDecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit/reuniao/:idReuniao/decisao/:idDecisao',
    component: VotoSimDecisaoUpdateComponent,
    resolve: {
      votoSimDecisao: VotoSimDecisaoRoutingResolveService,
      decisao: VotoSimRoutingResolveDecisaoService,
      reuniao: VotoSimRoutingResolveReuniaoService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(votoSimDecisaoRoute)],
  exports: [RouterModule],
})
export class VotoSimDecisaoRoutingModule {}
