package br.com.jhisolution.user.hunters.web.rest;

import br.com.jhisolution.user.hunters.domain.Reuniao;
import br.com.jhisolution.user.hunters.repository.ReuniaoRepository;
import br.com.jhisolution.user.hunters.service.ReuniaoService;
import br.com.jhisolution.user.hunters.web.rest.dto.FiltroReuniaoDTO;
import br.com.jhisolution.user.hunters.web.rest.dto.ReuniaoDTO;
import br.com.jhisolution.user.hunters.web.rest.errors.BadRequestAlertException;
import io.jsonwebtoken.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link br.com.jhisolution.user.hunters.domain.Reuniao}.
 */
@RestController
@RequestMapping("/api")
public class ReuniaoResource {

    private final Logger log = LoggerFactory.getLogger(ReuniaoResource.class);

    private static final String ENTITY_NAME = "reuniaoReuniao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReuniaoService reuniaoService;

    private final ReuniaoRepository reuniaoRepository;

    public ReuniaoResource(ReuniaoService reuniaoService, ReuniaoRepository reuniaoRepository) {
        this.reuniaoService = reuniaoService;
        this.reuniaoRepository = reuniaoRepository;
    }

    /**
     * {@code POST  /reuniaos} : Create a new reuniao.
     *
     * @param reuniao the reuniao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reuniao, or with status {@code 400 (Bad Request)} if the reuniao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reuniaos")
    public ResponseEntity<Reuniao> createReuniao(@Valid @RequestBody Reuniao reuniao) throws URISyntaxException {
        log.debug("REST request to save Reuniao : {}", reuniao);
        if (reuniao.getId() != null) {
            throw new BadRequestAlertException("A new reuniao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Reuniao result = reuniaoService.save(reuniao);
        return ResponseEntity
            .created(new URI("/api/reuniaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reuniaos/:id} : Updates an existing reuniao.
     *
     * @param id the id of the reuniao to save.
     * @param reuniao the reuniao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reuniao,
     * or with status {@code 400 (Bad Request)} if the reuniao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reuniao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reuniaos/{id}")
    public ResponseEntity<Reuniao> updateReuniao(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Reuniao reuniao
    ) throws URISyntaxException {
        log.debug("REST request to update Reuniao : {}, {}", id, reuniao);
        if (reuniao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reuniao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!reuniaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Reuniao result = reuniaoService.update(reuniao);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reuniao.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /reuniaos/:id} : Partial updates given fields of an existing reuniao, field will ignore if it is null
     *
     * @param id the id of the reuniao to save.
     * @param reuniao the reuniao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reuniao,
     * or with status {@code 400 (Bad Request)} if the reuniao is not valid,
     * or with status {@code 404 (Not Found)} if the reuniao is not found,
     * or with status {@code 500 (Internal Server Error)} if the reuniao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/reuniaos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Reuniao> partialUpdateReuniao(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Reuniao reuniao
    ) throws URISyntaxException {
        log.debug("REST request to partial update Reuniao partially : {}, {}", id, reuniao);
        if (reuniao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reuniao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!reuniaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Reuniao> result = reuniaoService.partialUpdate(reuniao);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reuniao.getId().toString())
        );
    }

    /**
     * {@code GET  /reuniaos} : get all the reuniaos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reuniaos in body.
     */
    @GetMapping("/reuniaos")
    public ResponseEntity<List<Reuniao>> getAllReuniaos(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Reuniaos");
        Page<Reuniao> page = reuniaoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/reuniaos/all/{id}")
    public ResponseEntity<List<ReuniaoDTO>> getReunioesById(@PathVariable Long id) {
        log.debug("REST request to get Reuniao : {}", id);
        List<ReuniaoDTO> reunioes = reuniaoService.findAllByReuniaoId(id);
        return ResponseEntity.ok().body(reunioes);
    }

    @PostMapping("/reuniaos/all/jasper")
    public ResponseEntity<Resource> getReunioesByIdJasper(@Valid @RequestBody FiltroReuniaoDTO filtro, HttpServletRequest request)
        throws URISyntaxException, IOException, java.io.IOException {
        log.debug("***************************************************************************************");
        log.debug("REST request to get a list of Meeting IF:{}", filtro.getIdReuniao());
        log.debug("***************************************************************************************");
        // Load file as Resource
        Resource resource = reuniaoService.findAllByReuniaoIdJasper(filtro);
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
            .headers(HeaderUtil.createAlert(applicationName, "Meeting exported successfully", resource.toString()))
            .body(resource);
    }

    /**
     * {@code GET  /reuniaos/:id} : get the "id" reuniao.
     *
     * @param id the id of the reuniao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reuniao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reuniaos/{id}")
    public ResponseEntity<Reuniao> getReuniao(@PathVariable Long id) {
        log.debug("REST request to get Reuniao : {}", id);
        Optional<Reuniao> reuniao = reuniaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(reuniao);
    }

    /**
     * {@code DELETE  /reuniaos/:id} : delete the "id" reuniao.
     *
     * @param id the id of the reuniao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reuniaos/{id}")
    public ResponseEntity<Void> deleteReuniao(@PathVariable Long id) {
        log.debug("REST request to delete Reuniao : {}", id);
        reuniaoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
