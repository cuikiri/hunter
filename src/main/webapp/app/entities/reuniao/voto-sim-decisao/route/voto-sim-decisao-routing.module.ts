import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VotoSimDecisaoComponent } from '../list/voto-sim-decisao.component';
import { VotoSimDecisaoDetailComponent } from '../detail/voto-sim-decisao-detail.component';
import { VotoSimDecisaoUpdateComponent } from '../update/voto-sim-decisao-update.component';
import { VotoSimDecisaoRoutingResolveService } from './voto-sim-decisao-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const votoSimDecisaoRoute: Routes = [
  {
    path: '',
    component: VotoSimDecisaoComponent,
    data: {
      defaultSort: 'id,' + ASC,
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
    path: ':id/edit',
    component: VotoSimDecisaoUpdateComponent,
    resolve: {
      votoSimDecisao: VotoSimDecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(votoSimDecisaoRoute)],
  exports: [RouterModule],
})
export class VotoSimDecisaoRoutingModule {}
