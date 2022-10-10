package br.com.jhisolution.user.hunters.service;

import br.com.jhisolution.user.hunters.web.rest.dto.FiltroFluxoCaixaDTO;
import br.com.jhisolution.user.hunters.web.rest.dto.FluxoCaixaDTO;
import java.util.List;
import org.springframework.core.io.Resource;

public interface FluxoCaixaService {
    List<FluxoCaixaDTO> findAllByDataInicialAndDataFinal(FiltroFluxoCaixaDTO filtro);
    Resource findAllByDataInicialAndDataFinalJasper(FiltroFluxoCaixaDTO filtro);
}
