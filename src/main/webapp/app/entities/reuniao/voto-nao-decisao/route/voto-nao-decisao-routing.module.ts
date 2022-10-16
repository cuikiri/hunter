import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VotoNaoDecisaoComponent } from '../list/voto-nao-decisao.component';
import { VotoNaoDecisaoDetailComponent } from '../detail/voto-nao-decisao-detail.component';
import { VotoNaoDecisaoUpdateComponent } from '../update/voto-nao-decisao-update.component';
import { VotoNaoDecisaoRoutingResolveService } from './voto-nao-decisao-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const votoNaoDecisaoRoute: Routes = [
  {
    path: '',
    component: VotoNaoDecisaoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VotoNaoDecisaoDetailComponent,
    resolve: {
      votoNaoDecisao: VotoNaoDecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VotoNaoDecisaoUpdateComponent,
    resolve: {
      votoNaoDecisao: VotoNaoDecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VotoNaoDecisaoUpdateComponent,
    resolve: {
      votoNaoDecisao: VotoNaoDecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(votoNaoDecisaoRoute)],
  exports: [RouterModule],
})
export class VotoNaoDecisaoRoutingModule {}
