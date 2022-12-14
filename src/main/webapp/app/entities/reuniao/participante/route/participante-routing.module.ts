import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ParticipanteComponent } from '../list/participante.component';
import { ParticipanteDetailComponent } from '../detail/participante-detail.component';
import { ParticipanteUpdateComponent } from '../update/participante-update.component';
import { ParticipanteRoutingResolveService } from './participante-routing-resolve.service';
import { ParticipanteRoutingResolveReuniaoService } from './participante-routing-resolve-reuniao.service';

const participanteRoute: Routes = [
  {
    path: '',
    component: ParticipanteComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'reuniao/:idReuniao',
    component: ParticipanteComponent,
    data: {
      defaultSort: 'id,asc',
    },
    resolve: {
      reuniao: ParticipanteRoutingResolveReuniaoService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ParticipanteDetailComponent,
    resolve: {
      participante: ParticipanteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ParticipanteUpdateComponent,
    resolve: {
      participante: ParticipanteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new/reuniao/:idReuniao',
    component: ParticipanteUpdateComponent,
    resolve: {
      participante: ParticipanteRoutingResolveService,
      reuniao: ParticipanteRoutingResolveReuniaoService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ParticipanteUpdateComponent,
    resolve: {
      participante: ParticipanteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(participanteRoute)],
  exports: [RouterModule],
})
export class ParticipanteRoutingModule {}
