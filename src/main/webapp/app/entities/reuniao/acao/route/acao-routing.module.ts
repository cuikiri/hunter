import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AcaoComponent } from '../list/acao.component';
import { AcaoDetailComponent } from '../detail/acao-detail.component';
import { AcaoUpdateComponent } from '../update/acao-update.component';
import { AcaoRoutingResolveService } from './acao-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const acaoRoute: Routes = [
  {
    path: '',
    component: AcaoComponent,
    data: {
      defaultSort: 'id,' + ASC,
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
