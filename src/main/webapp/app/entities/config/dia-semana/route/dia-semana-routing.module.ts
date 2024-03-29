import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DiaSemanaComponent } from '../list/dia-semana.component';
import { DiaSemanaDetailComponent } from '../detail/dia-semana-detail.component';
import { DiaSemanaUpdateComponent } from '../update/dia-semana-update.component';
import { DiaSemanaRoutingResolveService } from './dia-semana-routing-resolve.service';
import { DiaSemanaRoutingResolvePeriodoService } from './dia-semana-routing-resolve-periodo.service';

const diaSemanaRoute: Routes = [
  {
    path: '',
    component: DiaSemanaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'periodo/:idPeriodo',
    component: DiaSemanaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    resolve: {
      periodo: DiaSemanaRoutingResolvePeriodoService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiaSemanaDetailComponent,
    resolve: {
      diaSemana: DiaSemanaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiaSemanaUpdateComponent,
    resolve: {
      diaSemana: DiaSemanaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new/periodo/:idPeriodo',
    component: DiaSemanaUpdateComponent,
    resolve: {
      diaSemana: DiaSemanaRoutingResolveService,
      periodo: DiaSemanaRoutingResolvePeriodoService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiaSemanaUpdateComponent,
    resolve: {
      diaSemana: DiaSemanaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(diaSemanaRoute)],
  exports: [RouterModule],
})
export class DiaSemanaRoutingModule {}
