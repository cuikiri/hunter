package br.com.jhisolution.user.hunters.web.rest;

import br.com.jhisolution.user.hunters.domain.Reuniao;
import br.com.jhisolution.user.hunters.repository.ReuniaoRepository;
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
 * REST controller for managing {@link br.com.jhisolution.user.hunters.domain.Reuniao}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ReuniaoResource {

    private final Logger log = LoggerFactory.getLogger(ReuniaoResource.class);

    private static final String ENTITY_NAME = "reuniaoReuniao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReuniaoRepository reuniaoRepository;

    public ReuniaoResource(ReuniaoRepository reuniaoRepository) {
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
        Reuniao result = reuniaoRepository.save(reuniao);
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

        Reuniao result = reuniaoRepository.save(reuniao);
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

        Optional<Reuniao> result = reuniaoRepository
            .findById(reuniao.getId())
            .map(existingReuniao -> {
                if (reuniao.getNome() != null) {
                    existingReuniao.setNome(reuniao.getNome());
                }
                if (reuniao.getDescricao() != null) {
                    existingReuniao.setDescricao(reuniao.getDescricao());
                }
                if (reuniao.getData() != null) {
                    existingReuniao.setData(reuniao.getData());
                }
                if (reuniao.getDataInicio() != null) {
                    existingReuniao.setDataInicio(reuniao.getDataInicio());
                }
                if (reuniao.getDataFim() != null) {
                    existingReuniao.setDataFim(reuniao.getDataFim());
                }
                if (reuniao.getHoraInicio() != null) {
                    existingReuniao.setHoraInicio(reuniao.getHoraInicio());
                }
                if (reuniao.getHoraFim() != null) {
                    existingReuniao.setHoraFim(reuniao.getHoraFim());
                }
                if (reuniao.getTipoReuniao() != null) {
                    existingReuniao.setTipoReuniao(reuniao.getTipoReuniao());
                }
                if (reuniao.getObs() != null) {
                    existingReuniao.setObs(reuniao.getObs());
                }

                return existingReuniao;
            })
            .map(reuniaoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reuniao.getId().toString())
        );
    }

    /**
     * {@code GET  /reuniaos} : get all the reuniaos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reuniaos in body.
     */
    @GetMapping("/reuniaos")
    public List<Reuniao> getAllReuniaos() {
        log.debug("REST request to get all Reuniaos");
        return reuniaoRepository.findAll();
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
        Optional<Reuniao> reuniao = reuniaoRepository.findById(id);
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
        reuniaoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
