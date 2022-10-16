package br.com.jhisolution.user.hunters.web.rest;

import br.com.jhisolution.user.hunters.domain.Decisao;
import br.com.jhisolution.user.hunters.repository.DecisaoRepository;
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
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link br.com.jhisolution.user.hunters.domain.Decisao}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DecisaoResource {

    private final Logger log = LoggerFactory.getLogger(DecisaoResource.class);

    private static final String ENTITY_NAME = "reuniaoDecisao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DecisaoRepository decisaoRepository;

    public DecisaoResource(DecisaoRepository decisaoRepository) {
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
        Decisao result = decisaoRepository.save(decisao);
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

        Decisao result = decisaoRepository.save(decisao);
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

        Optional<Decisao> result = decisaoRepository
            .findById(decisao.getId())
            .map(existingDecisao -> {
                if (decisao.getNome() != null) {
                    existingDecisao.setNome(decisao.getNome());
                }
                if (decisao.getObs() != null) {
                    existingDecisao.setObs(decisao.getObs());
                }

                return existingDecisao;
            })
            .map(decisaoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, decisao.getId().toString())
        );
    }

    /**
     * {@code GET  /decisaos} : get all the decisaos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of decisaos in body.
     */
    @GetMapping("/decisaos")
    public List<Decisao> getAllDecisaos() {
        log.debug("REST request to get all Decisaos");
        return decisaoRepository.findAll();
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
        Optional<Decisao> decisao = decisaoRepository.findById(id);
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
        decisaoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
