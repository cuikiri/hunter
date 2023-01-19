package br.com.jhisolution.user.hunters.web.rest;

import br.com.jhisolution.user.hunters.domain.Acao;
import br.com.jhisolution.user.hunters.repository.AcaoRepository;
import br.com.jhisolution.user.hunters.service.AcaoService;
import br.com.jhisolution.user.hunters.service.MailLocaWebService;
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
 * REST controller for managing {@link br.com.jhisolution.user.hunters.domain.Acao}.
 */
@RestController
@RequestMapping("/api")
public class AcaoResource {

    private final Logger log = LoggerFactory.getLogger(AcaoResource.class);

    private static final String ENTITY_NAME = "reuniaoAcao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AcaoService acaoService;

    private final AcaoRepository acaoRepository;

    private final MailLocaWebService sendMail;

    public AcaoResource(AcaoService acaoService, AcaoRepository acaoRepository, MailLocaWebService sendMail) {
        this.acaoService = acaoService;
        this.acaoRepository = acaoRepository;
        this.sendMail = sendMail;
    }

    /**
     * {@code POST  /acaos} : Create a new acao.
     *
     * @param acao the acao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new acao, or with status {@code 400 (Bad Request)} if the acao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/acaos")
    public ResponseEntity<Acao> createAcao(@Valid @RequestBody Acao acao) throws URISyntaxException {
        log.debug("REST request to save Acao : {}", acao);
        if (acao.getId() != null) {
            throw new BadRequestAlertException("A new acao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Acao result = acaoService.save(acao);
        return ResponseEntity
            .created(new URI("/api/acaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /acaos/:id} : Updates an existing acao.
     *
     * @param id the id of the acao to save.
     * @param acao the acao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated acao,
     * or with status {@code 400 (Bad Request)} if the acao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the acao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/acaos/{id}")
    public ResponseEntity<Acao> updateAcao(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Acao acao)
        throws URISyntaxException {
        log.debug("REST request to update Acao : {}, {}", id, acao);
        if (acao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, acao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!acaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Acao result = acaoService.update(acao);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, acao.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /acaos/:id} : Partial updates given fields of an existing acao, field will ignore if it is null
     *
     * @param id the id of the acao to save.
     * @param acao the acao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated acao,
     * or with status {@code 400 (Bad Request)} if the acao is not valid,
     * or with status {@code 404 (Not Found)} if the acao is not found,
     * or with status {@code 500 (Internal Server Error)} if the acao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/acaos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Acao> partialUpdateAcao(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Acao acao
    ) throws URISyntaxException {
        log.debug("REST request to partial update Acao partially : {}, {}", id, acao);
        if (acao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, acao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!acaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Acao> result = acaoService.partialUpdate(acao);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, acao.getId().toString())
        );
    }

    /**
     * {@code GET  /acaos} : get all the acaos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of acaos in body.
     */
    @GetMapping("/acaos")
    public ResponseEntity<List<Acao>> getAllAcaos(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Acaos");
        Page<Acao> page = acaoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/acaos/reuniao/{id}")
    public ResponseEntity<List<Acao>> getAllAcaosByReuniaoId(
        @PathVariable Long id,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of Acaos");
        Page<Acao> page = acaoService.findAllByReuniaoId(id, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /acaos/:id} : get the "id" acao.
     *
     * @param id the id of the acao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the acao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/acaos/{id}")
    public ResponseEntity<Acao> getAcao(@PathVariable Long id) {
        log.debug("REST request to get Acao : {}", id);
        Optional<Acao> acao = acaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(acao);
    }

    /**
     * {@code DELETE  /acaos/:id} : delete the "id" acao.
     *
     * @param id the id of the acao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/acaos/{id}")
    public ResponseEntity<Void> deleteAcao(@PathVariable Long id) {
        log.debug("REST request to delete Acao : {}", id);
        acaoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/sendMail")
    public ResponseEntity<String> sendMail() {
        log.debug("REST request to sendMail");
        sendMail.sendMailLocaWeb();
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, "sendMail".toString()))
            .build();
    }
}
