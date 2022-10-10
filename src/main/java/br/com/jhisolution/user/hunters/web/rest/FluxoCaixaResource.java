package br.com.jhisolution.user.hunters.web.rest;

import br.com.jhisolution.user.hunters.service.FluxoCaixaService;
import br.com.jhisolution.user.hunters.web.rest.dto.FiltroFluxoCaixaDTO;
import br.com.jhisolution.user.hunters.web.rest.dto.FluxoCaixaDTO;
import io.jsonwebtoken.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.jhipster.web.util.HeaderUtil;

@RestController
@RequestMapping("/api")
public class FluxoCaixaResource {

    private final Logger log = LoggerFactory.getLogger(ReceberResource.class);

    private FluxoCaixaService fluxoCaixaService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public FluxoCaixaResource(FluxoCaixaService fluxoCaixaService) {
        this.fluxoCaixaService = fluxoCaixaService;
    }

    @PostMapping("/fluxocaixa/periodo")
    public ResponseEntity<List<FluxoCaixaDTO>> getFluxoCaixa(@Valid @RequestBody FiltroFluxoCaixaDTO filtro) throws URISyntaxException {
        log.debug("REST request to get a list of FluxoCaixa period - initial:{} to final:{}", filtro.getDataInicio(), filtro.getDataFim());
        List<FluxoCaixaDTO> caixas = fluxoCaixaService.findAllByDataInicialAndDataFinal(filtro);
        return ResponseEntity.ok().body(caixas);
    }

    @PostMapping("/fluxocaixa/report/periodo/jasper")
    public ResponseEntity<Resource> getContasReceberJasper(@Valid @RequestBody FiltroFluxoCaixaDTO filtro, HttpServletRequest request)
        throws URISyntaxException, IOException, java.io.IOException {
        log.debug("***************************************************************************************");
        log.debug("REST request to get a list of FluxoCaixa period - initial:{} to final:{}", filtro.getDataInicio(), filtro.getDataFim());
        log.debug("***************************************************************************************");
        // Load file as Resource
        Resource resource = fluxoCaixaService.findAllByDataInicialAndDataFinalJasper(filtro);
        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity
            .ok()
            .contentType(MediaType.parseMediaType(contentType))
            .contentLength(resource.getFile().length())
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + resource.getFilename())
            .headers(HeaderUtil.createAlert(applicationName, "Orders exported successfully", resource.toString()))
            .body(resource);
    }
}
