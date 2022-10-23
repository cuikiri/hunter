import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AcaoComponent } from '../list/acao.component';
import { AcaoDetailComponent } from '../detail/acao-detail.component';
import { AcaoUpdateComponent } from '../update/acao-update.component';
import { AcaoRoutingResolveService } from './acao-routing-resolve.service';
import { AcaoRoutingResolveReuniaoService } from './acao-routing-resolve-reuniao.service';

const acaoRoute: Routes = [
  {
    path: '',
    component: AcaoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'reuniao/:idReuniao',
    component: AcaoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    resolve: {
      reuniao: AcaoRoutingResolveReuniaoService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AcaoDetailComponent,
    resolve: {
      acao: AcaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AcaoUpdateComponent,
    resolve: {
      acao: AcaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new/reuniao/:idReuniao',
    component: AcaoUpdateComponent,
    resolve: {
      acao: AcaoRoutingResolveService,
      reuniao: AcaoRoutingResolveReuniaoService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AcaoUpdateComponent,
    resolve: {
      acao: AcaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(acaoRoute)],
  exports: [RouterModule],
})
export class AcaoRoutingModule {}
