import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DecisaoComponent } from '../list/decisao.component';
import { DecisaoDetailComponent } from '../detail/decisao-detail.component';
import { DecisaoUpdateComponent } from '../update/decisao-update.component';
import { DecisaoRoutingResolveService } from './decisao-routing-resolve.service';
import { DecisaoRoutingResolveReuniaoService } from './decisao-routing-resolve-reuniao.service';

const decisaoRoute: Routes = [
  {
    path: '',
    component: DecisaoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'reuniao/:idReuniao',
    component: DecisaoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    resolve: {
      reuniao: DecisaoRoutingResolveReuniaoService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'reuniao/:idReuniao/decisao/:idDecisao',
    component: DecisaoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    resolve: {
      reuniao: DecisaoRoutingResolveReuniaoService,
      decisao: DecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DecisaoDetailComponent,
    resolve: {
      decisao: DecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DecisaoDetailComponent,
    resolve: {
      decisao: DecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DecisaoUpdateComponent,
    resolve: {
      decisao: DecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new/reuniao/:idReuniao',
    component: DecisaoUpdateComponent,
    resolve: {
      decisao: DecisaoRoutingResolveService,
      reuniao: DecisaoRoutingResolveReuniaoService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DecisaoUpdateComponent,
    resolve: {
      decisao: DecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit/reuniao/:idReuniao',
    component: DecisaoUpdateComponent,
    resolve: {
      decisao: DecisaoRoutingResolveService,
      reuniao: DecisaoRoutingResolveReuniaoService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(decisaoRoute)],
  exports: [RouterModule],
})
export class DecisaoRoutingModule {}
