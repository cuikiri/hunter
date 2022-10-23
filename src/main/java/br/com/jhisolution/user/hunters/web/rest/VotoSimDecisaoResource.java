package br.com.jhisolution.user.hunters.web.rest;

import br.com.jhisolution.user.hunters.domain.VotoSimDecisao;
import br.com.jhisolution.user.hunters.repository.VotoSimDecisaoRepository;
import br.com.jhisolution.user.hunters.service.VotoSimDecisaoService;
import br.com.jhisolution.user.hunters.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
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
 * REST controller for managing {@link br.com.jhisolution.user.hunters.domain.VotoSimDecisao}.
 */
@RestController
@RequestMapping("/api")
public class VotoSimDecisaoResource {

    private final Logger log = LoggerFactory.getLogger(VotoSimDecisaoResource.class);

    private static final String ENTITY_NAME = "reuniaoVotoSimDecisao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VotoSimDecisaoService votoSimDecisaoService;

    private final VotoSimDecisaoRepository votoSimDecisaoRepository;

    public VotoSimDecisaoResource(VotoSimDecisaoService votoSimDecisaoService, VotoSimDecisaoRepository votoSimDecisaoRepository) {
        this.votoSimDecisaoService = votoSimDecisaoService;
        this.votoSimDecisaoRepository = votoSimDecisaoRepository;
    }

    /**
     * {@code POST  /voto-sim-decisaos} : Create a new votoSimDecisao.
     *
     * @param votoSimDecisao the votoSimDecisao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new votoSimDecisao, or with status {@code 400 (Bad Request)} if the votoSimDecisao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/voto-sim-decisaos")
    public ResponseEntity<VotoSimDecisao> createVotoSimDecisao(@Valid @RequestBody VotoSimDecisao votoSimDecisao)
        throws URISyntaxException {
        log.debug("REST request to save VotoSimDecisao : {}", votoSimDecisao);
        if (votoSimDecisao.getId() != null) {
            throw new BadRequestAlertException("A new votoSimDecisao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VotoSimDecisao result = votoSimDecisaoService.save(votoSimDecisao);
        return ResponseEntity
            .created(new URI("/api/voto-sim-decisaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /voto-sim-decisaos/:id} : Updates an existing votoSimDecisao.
     *
     * @param id the id of the votoSimDecisao to save.
     * @param votoSimDecisao the votoSimDecisao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated votoSimDecisao,
     * or with status {@code 400 (Bad Request)} if the votoSimDecisao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the votoSimDecisao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/voto-sim-decisaos/{id}")
    public ResponseEntity<VotoSimDecisao> updateVotoSimDecisao(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody VotoSimDecisao votoSimDecisao
    ) throws URISyntaxException {
        log.debug("REST request to update VotoSimDecisao : {}, {}", id, votoSimDecisao);
        if (votoSimDecisao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, votoSimDecisao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!votoSimDecisaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        VotoSimDecisao result = votoSimDecisaoService.update(votoSimDecisao);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, votoSimDecisao.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /voto-sim-decisaos/:id} : Partial updates given fields of an existing votoSimDecisao, field will ignore if it is null
     *
     * @param id the id of the votoSimDecisao to save.
     * @param votoSimDecisao the votoSimDecisao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated votoSimDecisao,
     * or with status {@code 400 (Bad Request)} if the votoSimDecisao is not valid,
     * or with status {@code 404 (Not Found)} if the votoSimDecisao is not found,
     * or with status {@code 500 (Internal Server Error)} if the votoSimDecisao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/voto-sim-decisaos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<VotoSimDecisao> partialUpdateVotoSimDecisao(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody VotoSimDecisao votoSimDecisao
    ) throws URISyntaxException {
        log.debug("REST request to partial update VotoSimDecisao partially : {}, {}", id, votoSimDecisao);
        if (votoSimDecisao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, votoSimDecisao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!votoSimDecisaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<VotoSimDecisao> result = votoSimDecisaoService.partialUpdate(votoSimDecisao);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, votoSimDecisao.getId().toString())
        );
    }

    /**
     * {@code GET  /voto-sim-decisaos} : get all the votoSimDecisaos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of votoSimDecisaos in body.
     */
    @GetMapping("/voto-sim-decisaos")
    public ResponseEntity<List<VotoSimDecisao>> getAllVotoSimDecisaos(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of VotoSimDecisaos");
        Page<VotoSimDecisao> page = votoSimDecisaoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/voto-sim-decisaos/decisao/{id}")
    public ResponseEntity<List<VotoSimDecisao>> getAllVotoSimDecisaosByDecisao(
        @PathVariable Long id,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of VotoSimDecisaos");
        Page<VotoSimDecisao> page = votoSimDecisaoService.findAllByDecisaoId(id, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /voto-sim-decisaos/:id} : get the "id" votoSimDecisao.
     *
     * @param id the id of the votoSimDecisao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the votoSimDecisao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/voto-sim-decisaos/{id}")
    public ResponseEntity<VotoSimDecisao> getVotoSimDecisao(@PathVariable Long id) {
        log.debug("REST request to get VotoSimDecisao : {}", id);
        Optional<VotoSimDecisao> votoSimDecisao = votoSimDecisaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(votoSimDecisao);
    }

    /**
     * {@code DELETE  /voto-sim-decisaos/:id} : delete the "id" votoSimDecisao.
     *
     * @param id the id of the votoSimDecisao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/voto-sim-decisaos/{id}")
    public ResponseEntity<Void> deleteVotoSimDecisao(@PathVariable Long id) {
        log.debug("REST request to delete VotoSimDecisao : {}", id);
        votoSimDecisaoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
