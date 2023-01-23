package br.com.jhisolution.user.hunters.web.rest;

import br.com.jhisolution.user.hunters.domain.Matricula;
import br.com.jhisolution.user.hunters.repository.MatriculaRepository;
import br.com.jhisolution.user.hunters.service.MatriculaService;
import br.com.jhisolution.user.hunters.service.dto.MatriculaDTO;
import br.com.jhisolution.user.hunters.web.rest.dto.FiltroMatriculaDTO;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link br.com.jhisolution.user.hunters.domain.Matricula}.
 */
@RestController
@RequestMapping("/api")
public class MatriculaResource {

    private final Logger log = LoggerFactory.getLogger(MatriculaResource.class);

    private static final String ENTITY_NAME = "matriculaMatricula";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MatriculaService matriculaService;

    private final MatriculaRepository matriculaRepository;

    public MatriculaResource(MatriculaService matriculaService, MatriculaRepository matriculaRepository) {
        this.matriculaService = matriculaService;
        this.matriculaRepository = matriculaRepository;
    }

    /**
     * {@code POST  /matriculas} : Create a new matricula.
     *
     * @param matricula the matricula to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new matricula, or with status {@code 400 (Bad Request)} if the matricula has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/matriculas")
    public ResponseEntity<Matricula> createMatricula(@Valid @RequestBody Matricula matricula) throws URISyntaxException {
        log.debug("REST request to save Matricula : {}", matricula);
        if (matricula.getId() != null) {
            throw new BadRequestAlertException("A new matricula cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Matricula result = matriculaService.save(matricula);
        return ResponseEntity
            .created(new URI("/api/matriculas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /matriculas/:id} : Updates an existing matricula.
     *
     * @param id the id of the matricula to save.
     * @param matricula the matricula to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated matricula,
     * or with status {@code 400 (Bad Request)} if the matricula is not valid,
     * or with status {@code 500 (Internal Server Error)} if the matricula couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/matriculas/{id}")
    public ResponseEntity<Matricula> updateMatricula(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Matricula matricula
    ) throws URISyntaxException {
        log.debug("REST request to update Matricula : {}, {}", id, matricula);
        if (matricula.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, matricula.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!matriculaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Matricula result = matriculaService.update(matricula);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, matricula.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /matriculas/:id} : Partial updates given fields of an existing matricula, field will ignore if it is null
     *
     * @param id the id of the matricula to save.
     * @param matricula the matricula to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated matricula,
     * or with status {@code 400 (Bad Request)} if the matricula is not valid,
     * or with status {@code 404 (Not Found)} if the matricula is not found,
     * or with status {@code 500 (Internal Server Error)} if the matricula couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/matriculas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Matricula> partialUpdateMatricula(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Matricula matricula
    ) throws URISyntaxException {
        log.debug("REST request to partial update Matricula partially : {}, {}", id, matricula);
        if (matricula.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, matricula.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!matriculaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Matricula> result = matriculaService.partialUpdate(matricula);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, matricula.getId().toString())
        );
    }

    /**
     * {@code GET  /matriculas} : get all the matriculas.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of matriculas in body.
     */
    @GetMapping("/matriculas")
    public ResponseEntity<List<Matricula>> getAllMatriculas(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        @RequestParam(required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of Matriculas");
        Page<Matricula> page;
        if (eagerload) {
            page = matriculaService.findAllWithEagerRelationships(pageable);
        } else {
            page = matriculaService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /documentos/dadospessoais/{id}} : get all the documentos by dados pessoais.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of documentos in body.
     */
    @GetMapping("/matriculas/dadospessoais/{id}")
    public ResponseEntity<List<Matricula>> getAllMatriculaByDadoPessoalId(
        @PathVariable Long id,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of Documentos by dados pessoais");
        Page<Matricula> page = matriculaService.findAllByPessoaId(id, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /documentos/dadospessoais/{id}} : get all the documentos by dados pessoais.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of documentos in body.
     */
    @GetMapping("/matriculas/dadospessoais/likenome/{nome}")
    public ResponseEntity<List<Matricula>> getAllMatriculaByDadoPessoalId(
        @PathVariable String nome,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of Documentos by dados pessoais");
        Page<Matricula> page = matriculaService.findAllByPessoaLikeNome(nome, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /matriculas/:id} : get the "id" matricula.
     *
     * @param id the id of the matricula to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the matricula, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/matriculas/{id}")
    public ResponseEntity<Matricula> getMatricula(@PathVariable Long id) {
        log.debug("REST request to get Matricula : {}", id);
        Optional<Matricula> matricula = matriculaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(matricula);
    }

    @GetMapping("/matriculas/jasper/{id}")
    public ResponseEntity<MatriculaDTO> getMatriculaJasper(@PathVariable Long id) {
        log.debug("REST request to get Matricula : {}", id);
        Optional<Matricula> matricula = matriculaService.findOne(id);

        MatriculaDTO resp = new MatriculaDTO();
        Matricula obj = matricula.orElse(null);

        if (Objects.nonNull(obj)) {
            resp =
                new MatriculaDTO(
                    obj.getId(),
                    obj.getData(),
                    obj.getResponsavel(),
                    obj.getRg(),
                    obj.getCpf(),
                    Objects.nonNull(obj.getDadosPessoais())
                        ? obj.getDadosPessoais().getNome() + " " + obj.getDadosPessoais().getSobreNome()
                        : ""
                );
        }

        return ResponseUtil.wrapOrNotFound(Optional.of(resp));
    }

    /**
     * {@code DELETE  /matriculas/:id} : delete the "id" matricula.
     *
     * @param id the id of the matricula to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/matriculas/{id}")
    public ResponseEntity<Void> deleteMatricula(@PathVariable Long id) {
        log.debug("REST request to delete Matricula : {}", id);
        matriculaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @PostMapping("/matriculas/report/autorizacao/esportiva/jasper")
    public ResponseEntity<Resource> getAutorizacaoEsportivaJasper(
        @Valid @RequestBody FiltroMatriculaDTO filtro,
        HttpServletRequest request
    ) throws URISyntaxException, IOException, java.io.IOException {
        log.debug("***************************************************************************************");
        log.debug("REST request to get a Autorizacao Esportiva");
        log.debug("***************************************************************************************");
        // Load file as Resource
        Resource resource = matriculaService.findOneJasper(filtro);
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
            .headers(HeaderUtil.createAlert(applicationName, "AutorizacaoEsportiva exported successfully", resource.toString()))
            .body(resource);
    }
}
