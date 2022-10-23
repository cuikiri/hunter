import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ReuniaoComponent } from '../list/reuniao.component';
import { ReuniaoDetailComponent } from '../detail/reuniao-detail.component';
import { ReuniaoUpdateComponent } from '../update/reuniao-update.component';
import { ReuniaoRoutingResolveService } from './reuniao-routing-resolve.service';

const reuniaoRoute: Routes = [
  {
    path: '',
    component: ReuniaoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReuniaoDetailComponent,
    resolve: {
      reuniao: ReuniaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReuniaoUpdateComponent,
    resolve: {
      reuniao: ReuniaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReuniaoUpdateComponent,
    resolve: {
      reuniao: ReuniaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(reuniaoRoute)],
  exports: [RouterModule],
})
export class ReuniaoRoutingModule {}
