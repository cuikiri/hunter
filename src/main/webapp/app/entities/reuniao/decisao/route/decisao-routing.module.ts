import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DecisaoComponent } from '../list/decisao.component';
import { DecisaoDetailComponent } from '../detail/decisao-detail.component';
import { DecisaoUpdateComponent } from '../update/decisao-update.component';
import { DecisaoRoutingResolveService } from './decisao-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const decisaoRoute: Routes = [
  {
    path: '',
    component: DecisaoComponent,
    data: {
      defaultSort: 'id,' + ASC,
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
    path: ':id/edit',
    component: DecisaoUpdateComponent,
    resolve: {
      decisao: DecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(decisaoRoute)],
  exports: [RouterModule],
})
export class DecisaoRoutingModule {}
