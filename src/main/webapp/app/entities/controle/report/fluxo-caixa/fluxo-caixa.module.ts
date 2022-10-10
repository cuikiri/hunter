import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FluxoCaixaReportComponent } from './detail/fluxo-caixa-report.component';
import { FluxoCAixaRoutingModule } from './route/fluxo-caixa-routing.module';

@NgModule({
  imports: [SharedModule, FluxoCAixaRoutingModule],
  declarations: [FluxoCaixaReportComponent],
  entryComponents: [],
})
export class FluxoCaixaModule {}
