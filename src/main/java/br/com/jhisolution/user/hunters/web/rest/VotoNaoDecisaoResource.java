package br.com.jhisolution.user.hunters.web.rest;

import br.com.jhisolution.user.hunters.domain.VotoNaoDecisao;
import br.com.jhisolution.user.hunters.repository.VotoNaoDecisaoRepository;
import br.com.jhisolution.user.hunters.service.VotoNaoDecisaoService;
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
 * REST controller for managing {@link br.com.jhisolution.user.hunters.domain.VotoNaoDecisao}.
 */
@RestController
@RequestMapping("/api")
public class VotoNaoDecisaoResource {

    private final Logger log = LoggerFactory.getLogger(VotoNaoDecisaoResource.class);

    private static final String ENTITY_NAME = "reuniaoVotoNaoDecisao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VotoNaoDecisaoService votoNaoDecisaoService;

    private final VotoNaoDecisaoRepository votoNaoDecisaoRepository;

    public VotoNaoDecisaoResource(VotoNaoDecisaoService votoNaoDecisaoService, VotoNaoDecisaoRepository votoNaoDecisaoRepository) {
        this.votoNaoDecisaoService = votoNaoDecisaoService;
        this.votoNaoDecisaoRepository = votoNaoDecisaoRepository;
    }

    /**
     * {@code POST  /voto-nao-decisaos} : Create a new votoNaoDecisao.
     *
     * @param votoNaoDecisao the votoNaoDecisao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new votoNaoDecisao, or with status {@code 400 (Bad Request)} if the votoNaoDecisao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/voto-nao-decisaos")
    public ResponseEntity<VotoNaoDecisao> createVotoNaoDecisao(@Valid @RequestBody VotoNaoDecisao votoNaoDecisao)
        throws URISyntaxException {
        log.debug("REST request to save VotoNaoDecisao : {}", votoNaoDecisao);
        if (votoNaoDecisao.getId() != null) {
            throw new BadRequestAlertException("A new votoNaoDecisao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VotoNaoDecisao result = votoNaoDecisaoService.save(votoNaoDecisao);
        return ResponseEntity
            .created(new URI("/api/voto-nao-decisaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /voto-nao-decisaos/:id} : Updates an existing votoNaoDecisao.
     *
     * @param id the id of the votoNaoDecisao to save.
     * @param votoNaoDecisao the votoNaoDecisao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated votoNaoDecisao,
     * or with status {@code 400 (Bad Request)} if the votoNaoDecisao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the votoNaoDecisao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/voto-nao-decisaos/{id}")
    public ResponseEntity<VotoNaoDecisao> updateVotoNaoDecisao(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody VotoNaoDecisao votoNaoDecisao
    ) throws URISyntaxException {
        log.debug("REST request to update VotoNaoDecisao : {}, {}", id, votoNaoDecisao);
        if (votoNaoDecisao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, votoNaoDecisao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!votoNaoDecisaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        VotoNaoDecisao result = votoNaoDecisaoService.update(votoNaoDecisao);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, votoNaoDecisao.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /voto-nao-decisaos/:id} : Partial updates given fields of an existing votoNaoDecisao, field will ignore if it is null
     *
     * @param id the id of the votoNaoDecisao to save.
     * @param votoNaoDecisao the votoNaoDecisao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated votoNaoDecisao,
     * or with status {@code 400 (Bad Request)} if the votoNaoDecisao is not valid,
     * or with status {@code 404 (Not Found)} if the votoNaoDecisao is not found,
     * or with status {@code 500 (Internal Server Error)} if the votoNaoDecisao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/voto-nao-decisaos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<VotoNaoDecisao> partialUpdateVotoNaoDecisao(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody VotoNaoDecisao votoNaoDecisao
    ) throws URISyntaxException {
        log.debug("REST request to partial update VotoNaoDecisao partially : {}, {}", id, votoNaoDecisao);
        if (votoNaoDecisao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, votoNaoDecisao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!votoNaoDecisaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<VotoNaoDecisao> result = votoNaoDecisaoService.partialUpdate(votoNaoDecisao);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, votoNaoDecisao.getId().toString())
        );
    }

    /**
     * {@code GET  /voto-nao-decisaos} : get all the votoNaoDecisaos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of votoNaoDecisaos in body.
     */
    @GetMapping("/voto-nao-decisaos")
    public ResponseEntity<List<VotoNaoDecisao>> getAllVotoNaoDecisaos(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of VotoNaoDecisaos");
        Page<VotoNaoDecisao> page = votoNaoDecisaoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/voto-nao-decisaos/decisao/{id}")
    public ResponseEntity<List<VotoNaoDecisao>> getAllVotoNaoDecisaosByDecisaoId(
        @PathVariable Long id,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of VotoNaoDecisaos");
        Page<VotoNaoDecisao> page = votoNaoDecisaoService.findAllByDecisaoId(id, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /voto-nao-decisaos/:id} : get the "id" votoNaoDecisao.
     *
     * @param id the id of the votoNaoDecisao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the votoNaoDecisao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/voto-nao-decisaos/{id}")
    public ResponseEntity<VotoNaoDecisao> getVotoNaoDecisao(@PathVariable Long id) {
        log.debug("REST request to get VotoNaoDecisao : {}", id);
        Optional<VotoNaoDecisao> votoNaoDecisao = votoNaoDecisaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(votoNaoDecisao);
    }

    /**
     * {@code DELETE  /voto-nao-decisaos/:id} : delete the "id" votoNaoDecisao.
     *
     * @param id the id of the votoNaoDecisao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/voto-nao-decisaos/{id}")
    public ResponseEntity<Void> deleteVotoNaoDecisao(@PathVariable Long id) {
        log.debug("REST request to delete VotoNaoDecisao : {}", id);
        votoNaoDecisaoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
