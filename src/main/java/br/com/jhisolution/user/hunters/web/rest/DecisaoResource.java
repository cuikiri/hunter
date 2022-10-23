package br.com.jhisolution.user.hunters.web.rest;

import br.com.jhisolution.user.hunters.domain.Decisao;
import br.com.jhisolution.user.hunters.repository.DecisaoRepository;
import br.com.jhisolution.user.hunters.service.DecisaoService;
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
 * REST controller for managing {@link br.com.jhisolution.user.hunters.domain.Decisao}.
 */
@RestController
@RequestMapping("/api")
public class DecisaoResource {

    private final Logger log = LoggerFactory.getLogger(DecisaoResource.class);

    private static final String ENTITY_NAME = "reuniaoDecisao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DecisaoService decisaoService;

    private final DecisaoRepository decisaoRepository;

    public DecisaoResource(DecisaoService decisaoService, DecisaoRepository decisaoRepository) {
        this.decisaoService = decisaoService;
        this.decisaoRepository = decisaoRepository;
    }

    /**
     * {@code POST  /decisaos} : Create a new decisao.
     *
     * @param decisao the decisao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new decisao, or with status {@code 400 (Bad Request)} if the decisao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/decisaos")
    public ResponseEntity<Decisao> createDecisao(@Valid @RequestBody Decisao decisao) throws URISyntaxException {
        log.debug("REST request to save Decisao : {}", decisao);
        if (decisao.getId() != null) {
            throw new BadRequestAlertException("A new decisao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Decisao result = decisaoService.save(decisao);
        return ResponseEntity
            .created(new URI("/api/decisaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /decisaos/:id} : Updates an existing decisao.
     *
     * @param id the id of the decisao to save.
     * @param decisao the decisao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated decisao,
     * or with status {@code 400 (Bad Request)} if the decisao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the decisao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/decisaos/{id}")
    public ResponseEntity<Decisao> updateDecisao(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Decisao decisao
    ) throws URISyntaxException {
        log.debug("REST request to update Decisao : {}, {}", id, decisao);
        if (decisao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, decisao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!decisaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Decisao result = decisaoService.update(decisao);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, decisao.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /decisaos/:id} : Partial updates given fields of an existing decisao, field will ignore if it is null
     *
     * @param id the id of the decisao to save.
     * @param decisao the decisao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated decisao,
     * or with status {@code 400 (Bad Request)} if the decisao is not valid,
     * or with status {@code 404 (Not Found)} if the decisao is not found,
     * or with status {@code 500 (Internal Server Error)} if the decisao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/decisaos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Decisao> partialUpdateDecisao(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Decisao decisao
    ) throws URISyntaxException {
        log.debug("REST request to partial update Decisao partially : {}, {}", id, decisao);
        if (decisao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, decisao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!decisaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Decisao> result = decisaoService.partialUpdate(decisao);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, decisao.getId().toString())
        );
    }

    /**
     * {@code GET  /decisaos} : get all the decisaos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of decisaos in body.
     */
    @GetMapping("/decisaos")
    public ResponseEntity<List<Decisao>> getAllDecisaos(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Decisaos");
        Page<Decisao> page = decisaoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/decisaos/reuniao/{id}")
    public ResponseEntity<List<Decisao>> getAllDecisaosByReuniaoId(
        @PathVariable Long id,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of Decisaos");
        Page<Decisao> page = decisaoService.findAllByReuniaoId(id, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /decisaos/:id} : get the "id" decisao.
     *
     * @param id the id of the decisao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the decisao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/decisaos/{id}")
    public ResponseEntity<Decisao> getDecisao(@PathVariable Long id) {
        log.debug("REST request to get Decisao : {}", id);
        Optional<Decisao> decisao = decisaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(decisao);
    }

    /**
     * {@code DELETE  /decisaos/:id} : delete the "id" decisao.
     *
     * @param id the id of the decisao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/decisaos/{id}")
    public ResponseEntity<Void> deleteDecisao(@PathVariable Long id) {
        log.debug("REST request to delete Decisao : {}", id);
        decisaoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
