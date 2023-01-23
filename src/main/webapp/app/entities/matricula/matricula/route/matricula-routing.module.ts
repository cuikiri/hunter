import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MatriculaComponent } from '../list/matricula.component';
import { MatriculaDetailComponent } from '../detail/matricula-detail.component';
import { MatriculaUpdateComponent } from '../update/matricula-update.component';
import { MatriculaPrintComponent } from '../print/matricula-print.component';
import { MatriculaRoutingResolveService } from './matricula-routing-resolve.service';
import { MatriculaRoutingResolvePessoaService } from './matricula-routing-resolve-pessoa.service';

const matriculaRoute: Routes = [
  {
    path: '',
    component: MatriculaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'dadospessoais/:idDadospessoais',
    component: MatriculaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    resolve: {
      dadosPessoais: MatriculaRoutingResolvePessoaService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MatriculaDetailComponent,
    resolve: {
      matricula: MatriculaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/print',
    component: MatriculaPrintComponent,
    resolve: {
      matricula: MatriculaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MatriculaUpdateComponent,
    resolve: {
      matricula: MatriculaUpdateComponent,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new/dadospessoais/:idDadospessoais',
    component: MatriculaUpdateComponent,
    resolve: {
      matricula: MatriculaRoutingResolveService,
      dadosPessoais: MatriculaRoutingResolvePessoaService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MatriculaUpdateComponent,
    resolve: {
      matricula: MatriculaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(matriculaRoute)],
  exports: [RouterModule],
})
export class MatriculaRoutingModule {}
